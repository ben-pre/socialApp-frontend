import React, { useContext, useEffect } from "react";
import { useParams, NavLink, Switch, Route } from "react-router-dom";
import { useImmer } from "use-immer";
import StateContext from "../StateContext";
import Page from "./Page";
import Axios from "axios";
import ProfilePosts from "./ProfilePosts";
import ProfileFollowers from "./ProfileFollowers";
import ProfileFollowing from "./ProfileFollowing";

const Profile = () => {
	const { username } = useParams();
	const appState = useContext(StateContext);
	const [state, setState] = useImmer({
		followActionLoading: false,
		startFollowingReqCount: 0,
		stopFollowingReqCount: 0,
		profileData: {
			profileUsername: "...",
			profileAvatar: "https://gravatar.com/avatar/placeholder?=128",
			isFollowing: false,
			counts: { postCount: "", followerCount: "", followingCount: "" },
		},
	});

	useEffect(() => {
		const req = Axios.CancelToken.source();
		async function fetchData() {
			try {
				const response = await Axios.post(`/profile/${username}`, {
					token: appState.user.token,
				});
				setState((draft) => {
					draft.profileData = response.data;
				});
			} catch (e) {
				console.log("There was a problem.");
			}
		}
		fetchData();
		return () => {
			req.cancel();
		};
	}, [username]);

	useEffect(() => {
		if (state.startFollowingReqCount) {
			setState((draft) => {
				draft.followActionLoading = true;
			});

			const req = Axios.CancelToken.source();
			async function fetchData() {
				try {
					const response = await Axios.post(
						`/addFollow/${state.profileData.profileUsername}`,
						{
							token: appState.user.token,
						}
					);
					setState((draft) => {
						draft.profileData.isFollowing = true;
						draft.profileData.counts.followerCount++;
						draft.followActionLoading = true;
					});
				} catch (e) {
					console.log("There was a problem.");
				}
			}
			fetchData();
			return () => {
				req.cancel();
			};
		}
	}, [state.startFollowingReqCount]);

	useEffect(() => {
		if (state.stopFollowingReqCount) {
			setState((draft) => {
				draft.followActionLoading = true;
			});

			const req = Axios.CancelToken.source();
			async function fetchData() {
				try {
					const response = await Axios.post(
						`/removeFollow/${state.profileData.profileUsername}`,
						{
							token: appState.user.token,
						}
					);
					setState((draft) => {
						draft.profileData.isFollowing = false;
						draft.profileData.counts.followerCount--;
						draft.followActionLoading = false;
					});
				} catch (e) {
					console.log("There was a problem.");
				}
			}
			fetchData();
			return () => {
				req.cancel();
			};
		}
	}, [state.stopFollowingReqCount]);

	function startFollowing() {
		setState((draft) => {
			draft.startFollowingReqCount++;
		});
	}

	function stopFollowing() {
		setState((draft) => {
			draft.stopFollowingReqCount++;
		});
	}

	return (
		<Page title="Profile Screen">
			<h2>
				<img className="avatar-small" src={state.profileData.profileAvatar} />{" "}
				{state.profileData.profileUsername}
				{appState.loggedIn &&
					!state.profileData.isFollowing &&
					appState.user.username != state.profileData.profileUsername &&
					state.profileData.profileUsername != "..." && (
						<button
							onClick={startFollowing}
							disabled={state.followActionLoading}
							className="btn btn-primary btn-sm ml-2"
						>
							Follow <i className="fas fa-user-plus"></i>
						</button>
					)}
				{appState.loggedIn &&
					state.profileData.isFollowing &&
					appState.user.username != state.profileData.profileUsername &&
					state.profileData.profileUsername != "..." && (
						<button
							onClick={stopFollowing}
							disabled={state.followActionLoading}
							className="btn btn-danger btn-sm ml-2"
						>
							Stop Following <i className="fas fa-user-times"></i>
						</button>
					)}
			</h2>

			<div className="profile-nav nav nav-tabs pt-2 mb-4">
				<NavLink
					exact
					to={`/profile/${state.profileData.profileUsername}`}
					className=" nav-item nav-link"
				>
					Posts: {state.profileData.counts.postCount}
				</NavLink>
				<NavLink
					to={`/profile/${state.profileData.profileUsername}/followers`}
					className="nav-item nav-link"
				>
					Followers: {state.profileData.counts.followerCount}
				</NavLink>
				<NavLink
					to={`/profile/${state.profileData.profileUsername}/following`}
					className="nav-item nav-link"
				>
					Following: {state.profileData.counts.followingCount}
				</NavLink>
			</div>
			<Switch>
				<Route exact path="/profile/:username">
					<ProfilePosts />
				</Route>
				<Route path="/profile/:username/followers">
					<ProfileFollowers />
				</Route>
				<Route path="/profile/:username/following">
					<ProfileFollowing />
				</Route>
			</Switch>
		</Page>
	);
};

export default Profile;