import React, {useState, useEffect} from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button, Card, CardContent,
  CardActions, CssBaseline, Grid, InputLabel, MenuItem, FormHelperText,
  FormControl, Select, Avatar, Divider, Link
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import {
   VictoryChart, VictoryLine, VictoryZoomContainer,
   VictoryTheme, VictoryTooltip, VictoryLegend, createContainer
} from 'victory';
import database from '../utils/database';
import Brayden from '../static/images/brayden.jpg';
import Morgan from '../static/images/morgan.png';

const useStyles = makeStyles(theme=>({
  root:{},
  menuButton:{
    marginRight: theme.spacing(2),
  },
  graphContainer:{

  },
  formControl:{
    minWidth: 300
  },
  statSelect: {
    margin:theme.spacing(2)
  },
  avatars: {
    margin:theme.spacing(4)
  },
  avatar: {
    width:theme.spacing(8),
    height:theme.spacing(8),
  },
  divider: {
    marginBottom:theme.spacing(2)
  },
  sources: {
    marginTop:theme.spacing(1)
  },
  sourceTop: {
    marginTop:theme.spacing(2),
  },
  sourceBottom: {
    marginTop:theme.spacing(1),
    marginBottom:theme.spacing(2)
  },
  info: {
    marginTop:theme.spacing(2)
  },
  infoZoomPan: {
    marginTop:theme.spacing(1)
  },
}))

const stats = [
  {name: 'Deaths', value: 'deaths'},
  {name: 'Confirmed', value: 'confirmed'},
  {name: 'Recovered', value: 'recovered'},
  {name: 'Concurrent', value: 'concurrent'},
  {name: 'Death Rate', value: 'death_rate'},
  {name: 'Confirmed Rate', value: 'confirmed_rate'},
  {name: 'Recovery Rate', value: 'recovered_rate'},
  {name: 'Active Rate', value: 'concurrent_rate'}
];

const statNameLookup = {
  'deaths': ' Deaths',
  'confirmed' : 'Confirmed',
  'recovered' : 'Recovered',
  'concurrent' : 'Concurrent',
  'death_rate': ' Death Rate',
  'confirmed_rate' : 'Confirmed Rate',
  'recovered_rate' : 'Recovery rate',
  'concurrent_rate' : 'Active rate'
};

const scopes = [
  {name: 'Global', value: 'global'},
  {name: 'Canada', value: 'CAN'},
  {name: 'United States', value: 'USA'}
];

const scopeNameLookup = {
  'USA': 'United States',
  'CAN': ' Canada',
  'Global' : 'global'
};

const zoomFactor = 6000;
const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

export default function Dashboard() {

  const classes = useStyles();

  const [statistic, setStatistic] = useState('recovered_rate');
  const [statisticName, setStatisticName] = useState('');

  const [scope, setScope] = useState('global');
  const [scopeName, setScopeName] = useState('');

  const [valueData, setValueData] = useState([]);
  const [predictionData, setPredictionData] = useState([]);

  const [range, setRange] = useState({min:0, max:10000});
  const [domain, setDomain] = useState({min:0, max:new Date()});

  const [view, setView] = useState('chart');

  useEffect(() => {
    database.initialize();
    updateGraph(statistic, scope);
  }, []);

  const updateGraph = async (statistic, scope) => {

    setStatistic(statistic);
    setStatisticName(statNameLookup[statistic]);

    setScope(scope);
    setScopeName(scopeNameLookup[scope]);

    const data = await database.getGlobalData(statistic, scope);

    setRange({
      min:data.minRange,
      max:data.maxRange
    });

    setDomain({
      min:data.minDomain,
      max:data.maxDomain
    });

    setValueData(data.values);
    setPredictionData(data.predictions);
  }

  const handleStatChange = async (event) => {
    updateGraph(event.target.value, scope);
  }

  const handleScopeChange = async (event) => {
    updateGraph(statistic, event.target.value);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">

        <Toolbar>
          <Grid
            container
            direction="row"
            justify="flex-start"
          >
            <Typography
              variant="h6"
              align='center'
              style={{wordWrap: "break-word" }}>
              <b>Machine Learning Covid-19 Predictions</b>
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Button color="inherit" onClick={() => setView('chart')}>Stats</Button>
            <Button color="inherit" onClick={() => setView('sources')}>Sources</Button>
            <Button color="inherit" onClick={() => setView('contactus')}>Contact Us</Button>
          </Grid>
        </Toolbar>
      </AppBar>

      {view === 'contactus' &&
        <React.Fragment>
          <Grid container spacing={2} justify='center' alignItems='center'>
            <Grid item xs={12} sm={10} md={10} lg={8}>
              <Card className={classes.graphContainer}>
                <Grid container spacing={2} direction="column" justify="center" alignItems="center">
                  <AvatarGroup max={2} className={classes.avatars}>
                    <Avatar alt="Brapden Blockwall" src={Brayden} className={classes.avatar}/>
                    <Avatar alt="Morgan Zuk" src={Morgan} className={classes.avatar}/>
                  </AvatarGroup>
                  <Typography variant="h4" gutterBottom>
                    We are the Data Lads.
                    <Divider variant="middle"/>
                  </Typography>
                  <br/>
                  <Typography variant="subtitle1" align='center'
                  style={{wordWrap: "break-word" }}>
                    <b>Brayden Blackwell (braydenblackwell21@gmail.com)</b> : Software Developer
                  </Typography>
                  <br/>
                  <Typography variant="subtitle1" align='center'
                  style={{wordWrap: "break-word" }}>
                    <b>Morgan Zuk (morgan.zuk@ucalgary.ca)</b> : Economics major @ The University of Calgary
                  </Typography>
                  <br/>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </React.Fragment>
      }

      {view === 'sources' &&
        <React.Fragment>
          <Grid container spacing={2} justify='center' alignItems='center'>
            <Grid item xs={12} sm={10} md={10} lg={8}>
              <Card className={classes.graphContainer}>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Typography
                    variant="subtitle1"
                    align="center"
                    style={{ wordWrap: "break-word" }}
                    className={classes.sourceTop}>
                    <Link href="https://covidapi.info/">
                      <b>Data Source: </b> https://covidapi.info/
                    </Link>
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    align="center"
                    style={{ wordWrap: "break-word" }}
                    className={classes.sources}>
                    <Link href="https://github.com/MaZDrew/alberta-innovates-ts-ml-covid">
                      <b>Machine Learning Source: </b> https://github.com/MaZDrew/alberta-innovates-ts-ml-covid
                    </Link>
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    align="center"
                    style={{ wordWrap: "break-word" }}
                    className={classes.sourceBottom}>
                    <Link href="https://github.com/MaZDrew/alberta-innovates-react-covid">
                      <b>Website Source: </b> https://github.com/MaZDrew/alberta-innovates-react-covid
                    </Link>
                  </Typography>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </React.Fragment>
      }

      {view === 'chart' && <React.Fragment>
        <CssBaseline />
        <Grid container spacing={2} justify='center' alignItems='center'>
          <Grid item xs={12} sm={10} lg={8}>

            <Card className={classes.graphContainer}>

                <VictoryChart
                    padding={{ left:75, bottom:50, right:50, top:50 }}
                    theme={VictoryTheme.material}
                    width={600} height={350} scale={{x: "time"}}
                    containerComponent={
                        <VictoryZoomVoronoiContainer
                          labels={({ datum }) => `${statisticName}: ${datum.y}`}
                          labelComponent={<VictoryTooltip/>}
                          minimumZoom={{x: domain.max / zoomFactor}}
                          zoomDomain={{x: [domain.min, domain.max], y:[range.min, range.max]}}
                          responsive={true}
                          zoomDimension="x"
                        />
                    }
                >
                  <VictoryLegend x={200} y={10}
                    orientation="horizontal"
                    gutter={20}
                    style={{ border: { stroke: "black" } }}
                    colorScale={[ "blue", "tomato" ]}
                    data={[
                      { name: 'True Value' }, { name: "Prediction" }
                    ]}
                  />
                  <VictoryLine style={{ data: {stroke: "blue"}, labels: {fill: "blue"}}}
                      data={valueData}
                  />
                  <VictoryLine style={{data: {stroke: "tomato"}, labels: {fill: "tomato"}}}
                      data={predictionData}
                  />
                </VictoryChart>

                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Select
                    className={classes.statSelect}
                    value={scope}
                    onChange={handleScopeChange}
                  >
                    {scopes.map((scope, index) => (
                        <MenuItem key={scope.name} value={scope.value}>{scope.name}</MenuItem>
                    ))}
                  </Select>
                  <Select
                    className={classes.statSelect}
                    value={statistic}
                    onChange={handleStatChange}
                  >
                    {stats.map((statData, index) => (
                        <MenuItem key={statData.name} value={statData.value}>{statData.name}</MenuItem>
                    ))}
                  </Select>
                </Grid>

            </Card>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography variant="subheading" className={classes.info}>
                <i>True values and predictions updated every 24 hours.</i>
              </Typography>
              <Typography variant="subheading" className={classes.infoZoomPan}>
                <i>Use the mouse wheel to zoom in. Click and drag to pan.</i>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>}

    </div>
  )
}
