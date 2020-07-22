import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import LoadingDotsIcon from "./LoadingDotsIcon";
import Post from "./Post";

const ProfilePosts = () => {
	const { username } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		async function fetchPosts() {
			try {
				const response = await Axios.get(`/profile/${username}/posts`);
				setPosts(response.data);
				setIsLoading(false);
			} catch (e) {
				console.log("There was a problem.");
			}
		}
		fetchPosts();
	}, [username]);

	if (isLoading) return <LoadingDotsIcon />;
	return (
		<div className="list-group">
			{posts.map((post) => {
				return <Post post={post} key={post._id} noAuthor={true} />;
			})}
		</div>
	);
};

export default ProfilePosts;
