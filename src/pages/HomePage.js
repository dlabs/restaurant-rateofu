import React, { useState } from 'react'
import {
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  TextField,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { Check as CheckIcon } from '@material-ui/icons'
import { MENU_ITEMS } from '../constants/menuItems'
import * as customers from '../redux/ducks/customers.duck'
import { Form, Formik } from 'formik'

const initialValues = {
  items: {},
}
MENU_ITEMS.forEach(menuItem => {
  initialValues.items[menuItem.id] = ''
})
console.log('initialValues', initialValues)

const HomePage = ({ placeOrderRequest }) => {
  const classes = useStyles()
  const [orderPlaced, setOrderPlaced] = useState(false)

  const onSuccess = () => {
    setOrderPlaced(true)
  }
  const onError = () => {}
  const handleFormSubmit = values => {
    const cleanValues = []
    Object.keys(values.items).forEach(key => {
      const quantity = values.items[key]
      if (quantity > 0) {
        //TODO: move this to server side
        const itemType = MENU_ITEMS.find(d => d.id === key).type
        const itemPrice = MENU_ITEMS.find(d => d.id === key).price
        console.log('itemType', itemType)
        cleanValues.push({
          item: key,
          quantity: quantity,
          type: itemType,
          price: itemPrice,
        })
      }
    })
    console.log('cleanValues', cleanValues)
    placeOrderRequest(cleanValues, onSuccess, onError)
  }

  return orderPlaced ? (
    <div>
      <div>
        <CheckIcon color="primary" /> Your order has been placed!
      </div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setOrderPlaced(false)}
      >
        Place a new order
      </Button>
    </div>
  ) : (
    <div>
      <h2>Select items you want to order</h2>
      <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <List className={classes.root}>
              {MENU_ITEMS.map(menuItem => {
                return (
                  <ListItem key={menuItem.id} dense>
                    <ListItemIcon>
                      <TextField
                        type="number"
                        size="small"
                        placeholder="0"
                        name={`items[${menuItem.id}]`}
                        value={values.items[menuItem.id]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {/*<Checkbox*/}
                      {/*  edge="start"*/}
                      {/*  checked={orders.indexOf(menuItem.id) !== -1}*/}
                      {/*  tabIndex={-1}*/}
                      {/*  disableRipple*/}
                      {/*  inputProps={{ 'aria-labelledby': labelId }}*/}
                      {/*/>*/}
                    </ListItemIcon>
                    <ListItemText
                      primary={`${menuItem.name} (${menuItem.price}€)`}
                    />
                  </ListItem>
                )
              })}
            </List>
            <Button variant="contained" color="primary" type="submit">
              Place the Order
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

const mapDispatchToProps = {
  placeOrderRequest: customers.actions.placeOrderRequest,
}

export default connect(null, mapDispatchToProps)(HomePage)
