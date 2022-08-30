import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import Award from "./award/Award";
import Certificate from "./certificate/Certificate";
import Education from "./education/Education";
import Project from "./project/Project";
import { UserStateContext } from "../App";
import * as Api from "../api";
import User from "./user/User";
import SideBar from "./darkmode/SideBar";
import DisplayToggleComp from "./DisplayToggleComp";

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);

  const [isEditable, setIsEditable] = useState(false)
// portfolioOwner?.id === userState.user?.id ? true : false

  const fetchPorfolioOwner = async (ownerId) => {
    const res = await Api.get("users", ownerId);
    const ownerData = res.data;
    setPortfolioOwner(ownerData);
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }

    if (params.userId) {
      const ownerId = params.userId;
      fetchPorfolioOwner(ownerId);
    } else {
      const ownerId = userState.user.id;
      fetchPorfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);
  
  if (!isFetchCompleted) {
    return "loading...";
  }


  return (
    <Container fluid style={{ zIndex: 0 }}>
      <Row style={{ width: "100%" }}>
        <Col md="3" lg="3">
          <User portfolioOwnerId={portfolioOwner.id} isEditable={isEditable} />
        </Col>
        <Col md="7">
          <div>
            {(userState?.user?.id===portfolioOwner.id)&&(
              <DisplayToggleComp 
              isEditable={isEditable}
              setIsEditable={setIsEditable}
              portfolioOwnerId={portfolioOwner.id}
              />
            )}
            <Education 
            isEditable={isEditable} 
            paramsUserId={params.userId} />
            <Award
              isEditable={isEditable}
              portfolioOwnerId={portfolioOwner.id}
            />
            <Project
              portfolioOwnerId={portfolioOwner.id}
              isEditable={isEditable}
            />
            <Certificate
              isEditable={isEditable}
              portfolioOwnerId={portfolioOwner.id}
            />
          </div>
        </Col>
        <SideBar />
      </Row>
    </Container>
  );
}

export default Portfolio;