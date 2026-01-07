// Mock for @expo/vector-icons
const React = require('react');

const createMockIcon = (name) => {
  const MockIcon = (props) => {
    return React.createElement('Text', {
      testID: `icon-${name}`,
      children: props.name || name,
    });
  };
  MockIcon.displayName = name;
  return MockIcon;
};

module.exports = {
  Ionicons: createMockIcon('Ionicons'),
  MaterialIcons: createMockIcon('MaterialIcons'),
  MaterialCommunityIcons: createMockIcon('MaterialCommunityIcons'),
  FontAwesome: createMockIcon('FontAwesome'),
  FontAwesome5: createMockIcon('FontAwesome5'),
  Feather: createMockIcon('Feather'),
  AntDesign: createMockIcon('AntDesign'),
  Entypo: createMockIcon('Entypo'),
  EvilIcons: createMockIcon('EvilIcons'),
  Foundation: createMockIcon('Foundation'),
  Octicons: createMockIcon('Octicons'),
  SimpleLineIcons: createMockIcon('SimpleLineIcons'),
  Zocial: createMockIcon('Zocial'),
  createIconSet: () => createMockIcon('CustomIcon'),
  createIconSetFromFontello: () => createMockIcon('FontelloIcon'),
  createIconSetFromIcoMoon: () => createMockIcon('IcoMoonIcon'),
};
