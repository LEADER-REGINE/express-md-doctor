import algoliasearch from 'algoliasearch/lite';
import { connectSearchBox, connectHits, Highlight, connectMenu, InstantSearch } from 'react-instantsearch-dom';
import { TextField, Paper, Typography, Box, Divider, IconButton, Menu, Container, MenuItem } from '@mui/material';
import "../appcomponents/css/Search.css"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Icon from '@mui/material/Icon';
import { loadCSS } from 'fg-loadcss';

const searchClient = algoliasearch('06RC56CRHD', '61bc497931637581637d8f096434e15c');


const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
    <Paper className='searchBox'>
        <form noValidate action="" role="search">
            <TextField
                fullWidth
                id="outlined-basic"
                label="Search"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon color="secondary" />
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                value={currentRefinement}
                onChange={event => refine(event.currentTarget.value)}
            />
            {isSearchStalled ? 'My search is stalled' : ''}
        </form>
    </Paper>
);

const Hits = ({ hits }) => (
    <Box className="searchContainer">
        {hits.map(hit => (
            <Paper key={hit.objectID} sx={{ marginTop: "15px" }}>
                <Link to={`p/${hit.objectID}`}>
                    <Box className="hitBox">
                        <Box>
                            <img src={hit.photoURL} className="docAvatar" />
                        </Box>
                        <Divider orientation="vertical" flexItem />
                        <Box className="docDetailBox">
                            <Box className="docNameBox">
                                <Typography className="lname">{hit.lastname}</Typography>
                                <Typography className="fname">{hit.firstname}</Typography>
                                <Typography className="type">{hit.type}</Typography>
                            </Box>
                            <Box className="docDeetsBox">
                                <Typography className="type">Phone Number: {hit.phoneNum}</Typography>
                                <Typography className="type">Location: {hit.location}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Link>
            </Paper>
        ))}
    </Box>
);

const filterMenu = ({ items, isFromSearch, refine, createURL }) => (
    <ol className="filterSelect">
        {items.map(item => (
            <li key={item.value}>
                <a
                    href={createURL(item.value)}
                    style={{ fontWeight: item.isRefined ? 'bold' : '' }}
                    onClick={event => {
                        event.preventDefault();
                        refine(item.value);
                    }}
                >
                    {isFromSearch ? (
                        <Highlight attribute="label" hit={item} />
                    ) : (
                        item.label
                    )}{' '}
                    ({item.count})
                </a>
            </li>
        ))}
    </ol>
);

const CustomSearchBox = connectSearchBox(SearchBox);
const CustomHits = connectHits(Hits);
const CustomMenu = connectMenu(filterMenu);

export default function SearchInterface() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    React.useEffect(() => {
        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
            // Inject before JSS
            document.querySelector('#font-awesome-css') || document.head.firstChild,
        );
        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);
    return (

        <InstantSearch searchClient={searchClient} indexName="doctors">
            <Typography className='headerStyle'>
                <Icon baseClassName="fas" className="fas fa-user-md" sx={{ fontSize: { xs: 30, md: 50 }, color: "primary"}} />
            </Typography>
            <Typography variant='h5' className='headerStyle'>Search Doctors</Typography>
            <Box className="resultContainer">
                <Box className="filterBox">
                    <CustomSearchBox />
                    <Paper >
                        <Container maxWidth="xl" disableGutters>
                            <Box className="filters" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                    className="filterIcon"
                                >
                                    <FilterAltIcon />
                                </IconButton>
                                <Menu
                                    className="filterBar"
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'flex', md: 'none' },
                                        flexDirection: { xs: 'column' },
                                    }}

                                >
                                    <MenuItem>
                                        <Typography variant="subtitle2">Filter by location: </Typography>
                                        <CustomMenu
                                            attribute="location"
                                        />
                                    </MenuItem>
                                    <MenuItem>
                                        <Typography variant="subtitle2">Filter by type: </Typography>
                                        <CustomMenu
                                            attribute="type"
                                        />
                                    </MenuItem>
                                </Menu>
                            </Box>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, flexDirection: { md: 'column' } }}>
                                <Typography variant="subtitle2">Filter by location: </Typography>
                                <CustomMenu
                                    attribute="location"
                                />
                                <Typography variant="subtitle2">Filter by type: </Typography>
                                <CustomMenu
                                    attribute="type"
                                />
                            </Box>
                        </Container>

                    </Paper>
                </Box>
                <Box className="hitResults">
                    <CustomHits />
                </Box>
            </Box>


        </InstantSearch>
    );
}
