import uuid
from datetime import datetime, timedelta

# Configuration
start_date = datetime(2025, 10, 28)
end_date = datetime(2025, 11, 30)
test_user_id = 'b0000000-0000-0000-0000-000000000001'

# Templates from existing dreams
dreams = [
    {
        "title": "Renk Yağmuru",
        "content": "Gökyüzünden renkler yağıyordu. Yağmur değil, sıvı renkler. Her şeyi boyuyordu. Dünya bir tablo haline geldi. En güzel manzarayı görmüştüm.",
        "feelings": "ARRAY['joy', 'joy', 'surprise']::feeling_enum[]",
        "interpretation_title": "Yaratıcılık ve Neşe",
        "interpretation": "Renklerin yağması, hayatınızdaki yaratıcılık ve neşe patlamasını simgeler. Dünyanın tabloya dönüşmesi, bakış açınızın güzelleştiğini gösterir.",
        "summary": "Hayatınızda yaratıcılık ve neşe dönemi.",
        "symbols": '[{"name": "Renkler", "meaning": "Duygular"}, {"name": "Yağmur", "meaning": "Bereket"}, {"name": "Tablo", "meaning": "Sanat"}]'
    },
    {
        "title": "Köprü Üstünde",
        "content": "Eski bir taş köprünün üstündeydim. Köprü dar ve eskiydi. Altında derin bir nehir hızla akıyordu, suyun sesini duyabiliyordum. Köprünün öbür tarafında parlak bir ışık vardı, beni çağırıyordu. Geçmeye çalışırken dengeimi korumak zorundaydım. Her adımda dikkatli olmam gerekiyordu.",
        "feelings": "ARRAY['curiosity', 'fear', 'joy']::feeling_enum[]",
        "interpretation_title": "Geçiş ve Değişim",
        "interpretation": "Köprü, hayatınızdaki bir geçiş dönemini simgeler. Karşıdaki ışık, ulaşmak istediğiniz hedefi veya aydınlanmayı temsil eder. Dengeyi koruma çabanız, bu süreçteki dikkatinizi gösterir.",
        "summary": "Önemli bir geçiş dönemindesiniz.",
        "symbols": '[{"name": "Köprü", "meaning": "Geçiş"}, {"name": "Nehir", "meaning": "Akış"}, {"name": "Işık", "meaning": "Hedef"}]'
    },
    {
        "title": "Son Rüya",
        "content": "Rüya gördüğümü biliyordum. Ama uyannmak istemiyordum. Etrafımda sevdiklerim vardı. Herkes mutluydu. Sıcak bir ışık bizi sarıyordu. Mükemmel bir andı.",
        "feelings": "ARRAY['joy', 'calm', 'love']::feeling_enum[]",
        "interpretation_title": "Huzur ve Bütünlük",
        "interpretation": "Bu rüya, içsel huzur ve sevdiklerinizle olan bağlarınızın gücünü yansıtır. Sıcak ışık, manevi koruma ve sevgiyi simgeler.",
        "summary": "İç huzur ve sevgi dolu bağlar.",
        "symbols": '[{"name": "Işık", "meaning": "Sevgi"}, {"name": "Aile", "meaning": "Güven"}, {"name": "Uyanmak", "meaning": "Farkındalık"}]'
    },
    {
        "title": "Uçan Yunuslar",
        "content": "Yunuslar gökyüzünde uçuyordu. Bulutların arasında zıplıyorlardı. Biri beni sırtına aldı ve geziye çıkardı. Denizden gökyüzüne geçiş yapmıştık. Muhteşem bir deneyimdi.",
        "feelings": "ARRAY['joy', 'joy', 'joy']::feeling_enum[]",
        "interpretation_title": "Özgürlük ve Neşe",
        "interpretation": "Uçan yunuslar, duygusal özgürlüğü ve sınırların kalkmasını simgeler. Gökyüzüne çıkmak, manevi yükselişi ve hafiflemeyi gösterir.",
        "summary": "Duygusal özgürlük ve manevi yükseliş.",
        "symbols": '[{"name": "Yunus", "meaning": "Neşe"}, {"name": "Uçmak", "meaning": "Özgürlük"}, {"name": "Gökyüzü", "meaning": "Sonsuzluk"}]'
    }
]

current_date = start_date
dream_sql = []
interp_sql = []

dream_counter = 1

while current_date <= end_date:
    # Logic for 3-5 dreams per week (skip every 3rd day -> ~4.6 dreams/week)
    # Days 0, 1: Dream
    # Day 2: Skip
    # Day 3, 4: Dream
    # Day 5: Skip
    if (current_date - start_date).days % 3 == 2:
        current_date += timedelta(days=1)
        continue

    # Pick a dream template (cycle through)
    template = dreams[dream_counter % len(dreams)]
    
    dream_id = str(uuid.uuid4())
    interp_id = str(uuid.uuid4())
    
    # Format date
    date_str = current_date.strftime('%Y-%m-%d %H:%M:%S+03')
    
    # Dream SQL
    dream_sql.append(f"""
  ('{dream_id}', '{test_user_id}', '{template['title']}',
   '{template['content']}',
   {template['feelings']}, 'tr', '{date_str}', '{date_str}')""")

    # Interpretation SQL
    interp_sql.append(f"""
  ('{interp_id}', '{dream_id}', 'standard', '{template['interpretation_title']}',
   '{template['interpretation']}',
   '{template['summary']}',
   '{template['symbols']}'::jsonb,
   'tr', '{date_str}')""")
    
    # Advance date by 1 day
    current_date += timedelta(days=1)
    dream_counter += 1

print("-- ============================================")
print("-- BACKFILL: OCTOBER 28 - NOVEMBER 30, 2025")
print("-- ============================================")
print("")
print("  INSERT INTO public.dreams (id, user_id, title, content, feelings, language, date, created_at) VALUES")
print(",\n".join(dream_sql) + ";")
print("")
print("  INSERT INTO public.interpretations (id, dream_id, method, title, interpretation, interpretation_summary, symbols, language, created_at) VALUES")
print(",\n".join(interp_sql) + ";")
