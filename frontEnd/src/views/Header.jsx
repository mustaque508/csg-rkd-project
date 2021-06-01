/**************************************  Header Component ********************************************/

import {React,Link,Navbar,Container,Nav} from './Import'

const Header = () => {
    return (
        <section className="header-section">
                 <Navbar bg="light" expand="lg">
                    <Container>
                    <Link to="/" className="text-uppercase navbar-brand">covid support group</Link>

                    {/* Menu Button */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    {/* Menu items */}
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="nav-link active" to="/">HOME</Link>    
                            <Link className="nav-link" to="/request">REQUEST</Link>
                            <Link className="nav-link " to="/purchase">PURCHASE</Link>
                            <Link className="nav-link " to="/">DISTRIBUTE</Link>
                        </Nav>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
        </section>
       
    )
}

export default Header
