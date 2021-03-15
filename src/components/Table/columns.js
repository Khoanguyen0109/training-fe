export const columns = [
  {
    id: "id",
    align: "left",
    disablePadding: false,
    sort: false,
  },

  {
    id: "name",
    align: "left",
    disablePadding: false,
    sort: true,
  },
  {
    id: "type",
    align: "left",
    type: "select",
    select: true,
    disablePadding: false,
    sort: true,
    options: ["Test", "Participant", "Assignment"],
  },
  {
    id: "weight",
    align: "left",
    type: "Number",
    disablePadding: false,
    sort: true,
    inputProps: {
      min: 0,
      max: 100,
    },
  },
];
