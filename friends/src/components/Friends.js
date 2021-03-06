import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Card, Col, Row, Spinner } from "reactstrap";

const card = {
	margin: "5% auto",
	height: "250px",
	borderTop: "15px groove",
	borderBottom: "15px groove",
	color: "#77ad17",
	textShadow: "-1px 0 darkgreen, 0 1px darkgreen, 1px 0 darkgreen, 0 -1px darkgreen",
};

const Friends = () => {
	const [info, setInfo] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 3000);
		axiosWithAuth()
			.get("/friends")
			.then(res => {
				console.log("API Is Here: ", res.data);
				setInfo(res.data);
			})
			.catch(error => {
				console.log("Whoops go back, thats an error!", error);
			});
	}, []);

	return (
		<section>
			{!loading ? (
			<Row>
				{info.map(friend => (
					<Col lg="3">
						<Card color="warning" style={card} key={friend.id}>
							<h3>Name: {friend.name}</h3>
							<h4>Age: {friend.age}</h4>
							<h5>Email: {friend.email}</h5>
						</Card>
					</Col>
				))}
				</Row>
			) : (
				<div>
				<Spinner type='grow' color="success" />
				<Spinner type='grow' color="warning" />
				<Spinner type='grow' color="success" />
				<Spinner type='grow' color="warning" />	
				<Spinner type='grow' color="success" />
			</div>
			)}
		</section>
	);
};
export default Friends;
