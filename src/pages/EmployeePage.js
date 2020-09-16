import {
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  makeStyles,
} from '@material-ui/core'
import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { Formik, Form } from 'formik'
import BarmanView from '../partials/BarmanView'
import ChefView from '../partials/ChefView'
import WaiterView from '../partials/WaiterView'
import { EMPLOYEE_ROLES } from '../constants/employeeRole'
import * as employees from '../redux/ducks/employees.duck'
import { connect } from 'react-redux'

const initialValues = {
  name: '',
  role: EMPLOYEE_ROLES.WAITER,
}

const EmployeePage = ({ loginRequest }) => {
  const classes = useStyles()
  const [user, setUser] = useState(null)
  const onSuccess = u => {
    console.log('u', u)
    setUser(u)
  }

  const handleFormSubmit = values =>
    loginRequest(values.name, values.role, onSuccess)

  return (
    <div>
      {user ? (
        <>
          <div>
            <span>
              Logged in as {user.name} ({user.role})
            </span>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setUser(null)}
            >
              Log out
            </Button>
          </div>
          <div>
            <SwitchRole
              role={user.role}
              barmanView={<BarmanView userId={user.id} />}
              chefView={<ChefView userId={user.id} />}
              waiterView={<WaiterView userId={user.id} />}
            />
          </div>
        </>
      ) : (
        <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
          {({ values, handleChange, handleBlur }) => (
            <Form className={classes.container}>
              <TextField
                required
                label="Name"
                name="name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <FormControl className={classes.formControl} required>
                <InputLabel required>Role</InputLabel>
                <Select name="role" value={values.role} onChange={handleChange}>
                  {Object.keys(EMPLOYEE_ROLES).map(roleName => (
                    <MenuItem value={EMPLOYEE_ROLES[roleName]} key={roleName}>
                      {EMPLOYEE_ROLES[roleName]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit" variant="contained" color="primary">
                Log In
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  )
}
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 200,
  },
}))
const mapDispatchToProps = {
  loginRequest: employees.actions.employeeLoginRequest,
}

export default connect(null, mapDispatchToProps)(EmployeePage)

const SwitchRole = ({ role, waiterView, barmanView, chefView }) => {
  switch (role) {
    case EMPLOYEE_ROLES.WAITER:
      return waiterView
    case EMPLOYEE_ROLES.BARMAN:
      return barmanView
    case EMPLOYEE_ROLES.CHEF:
      return chefView
    default:
      throw new Error(`Support for employee role "${role}" in not implemented.`)
  }
}
