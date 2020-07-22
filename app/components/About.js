import React, { useEffect } from "react";
import Page from "./Page";

const About = () => {
	return (
		<div>
			<Page title="About Us">
				<h2>About Us</h2>
				<p className="lead text-muted ">
					<strong>raconteur</strong> <small>[noun]</small>
					<br />
					<em>A person who excels in telling anecdotes.</em>
				</p>
				<p className="text-justify">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. At qui enim
					rem totam voluptatum. Aut saepe temporibus, facilis ex a iste expedita
					minima dolorum dicta doloribus libero aliquid, quae maxime? Lorem
					ipsum dolor sit amet consectetur adipisicing elit. Fugiat suscipit
					beatae eum, est soluta ducimus ratione et impedit sapiente, nihil,
					atque dignissimos adipisci? Totam atque officia quis voluptates sed
					veniam?
				</p>
				<p className="text-justify">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita
					voluptates quisquam possimus tenetur, dicta enim rerum quis, quaerat
					id nobis provident quo dolorum sapiente temporibus facere non
					repellendus consequatur cupiditate!
				</p>
			</Page>
		</div>
	);
};

export default About;
