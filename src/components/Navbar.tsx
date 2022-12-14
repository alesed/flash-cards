import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import MenuIcon from '@mui/icons-material/Menu';

import { AppPage } from '../App';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase/auth';

type Props = {
	title: string;
	pages: AppPage[];
};

const Navbar = ({ title, pages }: Props) => {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const user = useLoggedInUser();

	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = async () => {
		await signOut();
		handleCloseUserMenu();
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<ViewCarouselIcon
						sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
					/>
					<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
						<Typography
							variant="h5"
							noWrap
							sx={{
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none'
							}}
						>
							{title}
						</Typography>
					</Link>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' }
						}}
					>
						<IconButton
							size="large"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left'
							}}
							open={!!anchorElNav}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' }
							}}
						>
							{pages.map(page => (
								<Link
									key={page.name}
									to={page.path}
									style={{ textDecoration: 'none', color: 'inherit' }}
								>
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography textAlign="center">{page.name}</Typography>
									</MenuItem>
								</Link>
							))}
						</Menu>
					</Box>
					<ViewCarouselIcon
						sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
					/>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none'
						}}
					>
						{title}
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: {
								xs: 'none',
								md: 'flex',
								flexDirection: 'row-reverse'
							}
						}}
					>
						{[...pages].reverse().map(page => (
							<Link
								key={page.name}
								to={page.path}
								style={{ textDecoration: 'none' }}
							>
								<Button
									variant="outlined"
									key={page.name}
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: 'white', display: 'block', mr: 1 }}
								>
									{page.name}
								</Button>
							</Link>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar
									alt={user?.email?.toUpperCase()}
									src="/static/images/avatar/2.jpg"
								/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={!!anchorElUser}
							onClose={handleCloseUserMenu}
						>
							{user && (
								<MenuItem disabled divider>
									<Typography textAlign="center">{user.email}</Typography>
								</MenuItem>
							)}
							{user && (
								<Link
									to="/user-sets"
									style={{ textDecoration: 'none', color: 'inherit' }}
								>
									<MenuItem onClick={handleCloseUserMenu}>
										<Typography textAlign="center">My sets</Typography>
									</MenuItem>
								</Link>
							)}
							{!user && (
								<Link
									to="/login"
									style={{ textDecoration: 'none', color: 'inherit' }}
								>
									<MenuItem onClick={handleCloseUserMenu}>
										<Typography textAlign="center">Login</Typography>
									</MenuItem>
								</Link>
							)}
							{user && (
								<MenuItem onClick={handleLogout}>
									<Typography textAlign="center">Logout</Typography>
								</MenuItem>
							)}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
