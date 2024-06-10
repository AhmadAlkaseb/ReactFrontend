import {NavLink} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const RenderMenu = ({role , closeMenu} ) => {

    console.log('User role:', role);

    // Da role er en Array må vi udtrække
    const userRole = Array.isArray(role) ? role[0] : role;

    switch (userRole) {
        case 'admin':
            return (
                <ul>
                    <li><NavLink to="/setitemforsale" onClick={closeMenu}>Sell item</NavLink></li>
                    <li><NavLink to="/mylisteditems" onClick={closeMenu}>My items</NavLink></li>
                    <li><NavLink to="/home" onClick={closeMenu}>Home</NavLink></li>
                    <li><NavLink to="/itemsforsale" onClick={closeMenu}>Shop deals</NavLink></li>
                    <li><NavLink to="/admin" onClick={closeMenu}>Administration</NavLink></li>
                    <li><NavLink to="/logout" onClick={closeMenu}>Logout</NavLink></li>
                </ul>
            );
        case 'user':
            return (
                <ul>
                    <li><NavLink to="/setitemforsale" onClick={closeMenu}>Sell item</NavLink></li>
                    <li><NavLink to="/mylisteditems" onClick={closeMenu}>My items</NavLink></li>
                    <li><NavLink to="/home" onClick={closeMenu}>Home</NavLink></li>
                    <li><NavLink to="/itemsforsale" onClick={closeMenu}>Shop deals</NavLink></li>
                    <li><NavLink to="/logout" onClick={closeMenu}>Logout</NavLink></li>
                </ul>
            );
        default:
            return (
                <ul>
                    <li><NavLink to="/login" onClick={closeMenu}>Login</NavLink></li>
                </ul>
            )
    }
};

export default RenderMenu;