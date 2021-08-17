/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from './Button';
import {
  IconButton,
  Box,
  Divider,
  InputAdornment,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
  ClickAwayListener,
  useMediaQuery,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import TextField from './TextField';
import { ReactComponent as LogoWithTextTemp } from '../../lib/assets/logoWithTextTemp.svg';
import { ReactComponent as AlarmOff } from '../../lib/assets/alarmOff.svg';
import { ReactComponent as alarmOn } from '../../lib/assets/alarmOn.svg';
import { ReactComponent as UserProfile } from '../../lib/assets/userProfile.svg';
import { ReactComponent as SearchIcon } from '../../lib/assets/searchIcon.svg';
import palette from '../../lib/styles/palette';

const Header = ({ user, onLogout }) => {
  const [menuAnchor, setMenuAnchor] = useState();
  const history = useHistory();
  const [scrollPosition, setScrollPosition] = useState(0);
  const m1200 = useMediaQuery('(max-width: 1199px)');
  const isMobile = useMediaQuery('(max-width: 600px)');

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  const handleMenu = (e) => {
    if (!e) return;
    setMenuAnchor(menuAnchor ? null : e.currentTarget);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });

  return (
    <Box css={[headerWrapper, scrollPosition !== 0 && headerScrolled]}>
      <LogoWithTextTemp css={logo} onClick={() => history.push('/')} />
      <Link to="/talent" css={navItem}>
        재능 찾기
      </Link>
      {user && (
        <Link to="/mychannel" css={navItem}>
          마이 채널
        </Link>
      )}
      <Box sx={{ flex: 1 }}></Box>
      {!m1200 && (
        <TextField
          sx={search}
          placeholder="배우고 싶은 재능을 검색해보세요"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}

      {user ? (
        <>
          <IconButton sx={{ marginRight: '9px' }}>
            <AlarmOff />
          </IconButton>
          <ClickAwayListener
            onClickAway={() => {
              setMenuAnchor(null);
            }}
          >
            <Box>
              <IconButton sx={{ padding: 0 }} onClick={handleMenu}>
                <UserProfile />
              </IconButton>
              <Popper
                open={!!menuAnchor}
                anchorEl={menuAnchor}
                placement="bottom-end"
              >
                <Paper sx={menuWrapper}>
                  <MenuList dense>
                    <Box className="userInfo">
                      <Typography fontSize="25px" fontWeight="bold">
                        {user.nickname}
                      </Typography>
                      <Typography fontSize="14px" color="#5F5F5F">
                        {user.email}
                      </Typography>
                    </Box>
                    <Divider />
                    <MenuItem>
                      <ListItemText>프로필</ListItemText>
                    </MenuItem>
                    <MenuItem>
                      <ListItemText>모아 보기</ListItemText>
                    </MenuItem>
                    <MenuItem>
                      <ListItemText>설정</ListItemText>
                    </MenuItem>
                    <Divider />
                    <Box className="menuFotter">
                      <Button onClick={onLogout}>로그아웃</Button>
                    </Box>
                  </MenuList>
                </Paper>
              </Popper>
            </Box>
          </ClickAwayListener>
        </>
      ) : (
        <>
          <Link to="/signin">
            <Button>로그인</Button>
          </Link>
          {!isMobile && (
            <Link to="/signup">
              <Button sx={{ marginLeft: '21px' }}>회원 가입</Button>
            </Link>
          )}
        </>
      )}
    </Box>
  );
};

const headerWrapper = css`
  padding: 0 3.125rem;
  width: 100vw;
  height: 4.0625rem;
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
`;

const headerScrolled = css`
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(2px);
`;

const logo = css`
  width: 9.375rem;
  height: 2.045625rem;
  flex-shrink: 0;
  cursor: pointer;
`;

const navItem = css`
  width: 10rem;
  height: 4.0625rem;
  line-height: 4.0625rem;
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
  color: ${palette.black};
  transition: all 0.1s;
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    color: ${palette.orange};
    border-bottom: 3px solid ${palette.orange};
  }
  &:active {
    color: ${palette.black};
  }
`;

const search = css`
  width: calc(100% / 6 + 9.1875rem);
  margin-right: 5%;
  .MuiInput-root {
    &::before {
      border-bottom: 2px solid ${palette.black} !important;
    }
    &::after {
      border-bottom: 2px solid ${palette.black} !important;
    }
  }
  .MuiInput-input {
    font-size: 0.75rem;
  }
`;

const menuWrapper = css`
  width: 15rem;
  height: 22.5rem;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  transform: translateY(0.875rem);
  .MuiList-root {
    width: 100%;
    height: 100%;
    padding: 0;
    .userInfo {
      height: 7.8125rem;
      display: flex;
      flex-direction: column;
      padding-left: 2.6875rem;
      align-items: flex-start;
      justify-content: center;
    }
    .MuiListItem-root {
      height: 2.8125rem;
      font-size: 1rem;
      padding-left: 1.625rem;
      &:hover {
        .MuiTypography-root {
          font-weight: bold;
        }
      }
    }
    .menuFotter {
      height: 6.25rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .MuiButton-root {
        width: 6.375rem;
      }
    }
  }
`;

export default memo(Header);
