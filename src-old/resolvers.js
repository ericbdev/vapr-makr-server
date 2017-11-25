const manufacturersList = [
  {
    id: 1,
    shortName: 'CAP',
    longName: 'Capella',
  },
  {
    id: 2,
    shortName: 'TPA',
    longName: 'The Perfumers/Flavor Apprentice',
  },
  {
    id: 3,
    shortName: 'FW',
    longName: 'Flavor West',
  },
];

const flavorsList = [

];

const channels = [{
  id: 1,
  name: 'soccer',
}, {
  id: 2,
  name: 'baseball',
}];


export const resolvers = {
  Query: {
    flavors: () => {
      return flavorsList;
    }
  },
};
