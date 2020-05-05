import React, {useState} from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button, Card, CardContent,
  CardActions, CssBaseline, Grid, InputLabel, MenuItem, FormHelperText, FormControl, Select
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme=>({
  root:{},
  menuButton:{
    marginRight: theme.spacing(2),
  },
  title:{
    flexGrow: 1,
  },
  graphContainer:{

  },
  formControl:{
    minWidth: 150
  }
}))

export default function Dashboard(){

  const classes = useStyles();
  const [statistics, setStatistics] = useState('');

  const handleChange = (event) => {
    setStatistics(event.target.value);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            In Production
          </Typography>
          <Button color="inherit">Contact Us</Button>
        </Toolbar>
      </AppBar>

      <React.Fragment>
        <CssBaseline />
        <Grid container spacing={2} justify='center' alignItems='center'>
          <Grid item xs={8}>

            <Card className={classes.graphContainer}>
              <CardContent>
              </CardContent>
              <CardActions>
                <FormControl className={classes.formControl}>
                  <InputLabel>Statistics</InputLabel>
                  <Select
                    value={statistics}
                    onChange={handleChange}
                  >
                    <MenuItem value={'confirmed'}>Confirmed</MenuItem>
                    <MenuItem value={'deaths'}>Deaths</MenuItem>
                    <MenuItem value={'recovered'}>Recovered</MenuItem>
                  </Select>
                </FormControl>
              </CardActions>
            </Card>

          </Grid>
        </Grid>
      </React.Fragment>
      
    </div>
  )
}
