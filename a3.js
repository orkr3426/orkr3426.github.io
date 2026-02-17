const defaultConfigWide = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: {
    url: "dataset/videogames_wide.csv"
  },
  width: "container",
  height: 300,
}
const defaultConfigLong = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: {
    url: "dataset/videogames_long.csv"
  },
  width: "container",
  height: 500,
}

const vis1_1 = {
  ...defaultConfigWide,
  description: "Total Global Sales by Genre",
  mark: "bar",
  encoding: {
    y: {
      field: "Genre",
      type: "nominal",
      sort: "-x",
      title: "Genre",
    },

    x: {
      field: "Global_Sales",
      type: "quantitative",
      aggregate: "sum",
      title: "Total Global Sales (Millions)",
    },

    tooltip: [
      { field: "Genre", type: "nominal" },
      { field: "Global_Sales", type: "quantitative", aggregate: "sum", title: "Total Global Sales" },
    ],
  },
}

const vis1_2 = {
  ...defaultConfigWide,
  description: "Total Global Sales by Platform and Genre",
  mark: "rect",
  encoding: {
    x: {
      field: "Platform",
      type: "nominal",
      title: "Platform",
    },
    y: {
      field: "Genre",
      type: "nominal",
      title: "Genre",
    },
    color: {
      field: "Global_Sales",
      type: "quantitative",
      aggregate: "sum",
      title: "Total Global Sales",
      scale: {
        scheme: "blues",
      },
    },
    tooltip: [
      { field: "Platform", type: "nominal" },
      { field: "Genre", type: "nominal" },
      { aggregate: "sum", field: "Global_Sales", type: "quantitative", title: "Total Sales" },
    ],
  },
}

const vis2_1 = {
  ...defaultConfigWide,
  description: "Total Global Sales Over Time",
  transform: [
    { filter: "datum.Year != null"}
  ],
  mark: "line",
  encoding: {
    x: {
      field: "Year",
      type: "Temporal",
      title: "Year",
    },
    y: {
      field: "Global_Sales",
      aggregate: "sum",
      type: "quantitative",
      title: "Total Global Sales"
    },
    tooltip: [
      { field: "Year", type: "temporal" },
      { field: "Global_Sales", aggregate: "sum", title: "Total Sales" },
    ]
  }
}

const vis2_2 = {
  ...defaultConfigWide,
  description: "Platform Sales Trends Over Time",
  transform: [
    { filter: "datum.Year != null" },
    {
      joinaggregate: [
        { op: "sum", field: "Global_Sales", as: "platform_total" }
      ],
      groupby: [ "Platform" ]
    },
    {
      window: [
        { op: "dense_rank", as: "rank" },
      ],
      sort: [
        { field: "platform_total", order: "descending" },
      ],
      groupby: [],
    },
    {
      filter: "datum.rank <= 5"
    }
  ],
  mark: "line",
  encoding: {
    x: {
      field: "Year",
      type: "temporal",
    },
    y: {
      field: "Global_Sales",
      type: "quantitative",
      aggregate: "sum",
      title: "Total Global Sales"
    },
    color: {
      field: "Platform",
      type: "nominal",
    },
  },
}

const vis3_1 = {
  ...defaultConfigLong,
  description: "Regional Sales by Platform",
  mark: "bar",
  encoding: {
    x: {
      field: "platform",
      type: "nominal",
      title: "Platform"
    },
    y: {
      field: "sales_amount",
      type: "quantitative",
      aggregate: "sum",
      title: "Total Sales (Millions)"
    },
    color: {
      field: "sales_region",
      type: "nominal",
      title: "Region"
    },
    tooltip: [
      { field: "platform" },
      { field: "sales_region" },
      { aggregate: "sum", field: "sales_amount", title: "Total Sales"}
    ]
  }
};

const vis3_2 = {
  ...defaultConfigLong,
  description: "Platform vs Region Sales Heatmap",
  mark: "rect",
  encoding: {
    x: {
      field: "platform",
      type: "nominal",
      title: "Platform"
    },
    y: {
      field: "sales_region",
      type: "nominal",
      title: "Region"
    },
    color: {
      aggregate: "sum",
      field: "sales_amount",
      type: "quantitative",
      title: "Total Sales (Millions)",
      scale: { scheme: "greens" }
    },
    tooltip: [
      { field: "platform" },
      { field: "sales_region" },
      { aggregate: "sum", field: "sales_amount" }
    ]
  }
};

const vis4_1 = {
  ...defaultConfigLong,
  description: "Genre Popularity by Region",
  facet: {
    field: "sales_region",
    type: "nominal",
    title: "Sales by region",
  },
  spec: {
    width: window.innerWidth / 6,
    mark: "bar",
    encoding: {
      x: {
        field: "genre",
        type: "nominal",
        sort: "-y",
        title: "Genre",
      },
      y: {
        field: "sales_amount",
        aggregate: "sum",
        type: "quantitative",
        title: "Total Sales (Millions)"
      },
      color: {
        field: "genre",
        type: "nominal",
        legend: null
      },
      tooltip: [
        { field: "genre", "title": "Genre" },
        { aggregate: "sum", field: "sales_amount", title: "Total Sales" }
      ]
    },
  }
};

const vis4_2 = {
  ...defaultConfigWide,
  description: "Genre Popularity Over Time",
  transform: [
    { filter: "datum.Year != null" },
    {
      aggregate: [
        { op: "sum", field: "Global_Sales", as: "yearly_sales" }
      ],
      groupby: ["Genre", "Year"]
    },
    {
      joinaggregate: [
        { op: "sum", field: "yearly_sales", as: "genre_total" }
      ],
      groupby: ["Genre"]
    },
    {
      window: [
        { op: "dense_rank", as: "rank" }
      ],
      sort: [
        { field: "genre_total", order: "descending" }
      ],
      groupby: [],
    },
    { filter: "datum.rank <= 5" }
  ],
  mark: {
    type: "line",
    point: true
  },

  encoding: {
    x: {
      field: "Year",
      type: "temporal",
    },

    y: {
      field: "yearly_sales",
      type: "quantitative",
      title: "Total Global Sales (Millions)"
    },

    color: {
      field: "Genre",
      type: "nominal"
    },

    tooltip: [
      { field: "Genre" },
      { field: "Year" },
      { field: "yearly_sales" }
    ]
  }
};

vegaEmbed("#vis1-1", vis1_1);
vegaEmbed("#vis1-2", vis1_2);
vegaEmbed("#vis2-1", vis2_1);
vegaEmbed("#vis2-2", vis2_2);
vegaEmbed("#vis3-1", vis3_1);
vegaEmbed("#vis3-2", vis3_2);
vegaEmbed("#vis4-1", vis4_1);
vegaEmbed("#vis4-2", vis4_2);