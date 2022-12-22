import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useNavigate  } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import { Nav, Navbar, Button } from 'react-bootstrap'

const Menu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate ()
  const { user } = useSelector(state => state)

  const handleLogout = async (e) => {
    e.preventDefault()
    window.localStorage.clear()
    dispatch(logoutUser())
    navigate('/')
  }
  if (!user) {
    return null
  }

  return (
    <div className='menu'>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link className='padding' to="/">Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link className='padding' to="/users">Users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <span className='padding'>{user.name} logged In</span>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Button variant="danger" className='padding' onClick={handleLogout}>Logout</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Menu