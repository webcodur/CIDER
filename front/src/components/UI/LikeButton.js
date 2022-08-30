import * as Api from '../../api';
import { Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import AuthContext from '../project/stores/AuthContext';

const LikeButton = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const context = useContext(AuthContext);

  const updateLikes = async () => {
    setIsClicked(!isClicked);

    let body = { direction: 'false' };

    if (isClicked) {
      body = { direction: 'true' };
    }

    try {
      await Api.patch(props.user.id, 'likes', body);
    } catch (err) {
      context.setModalText('좋아요 요청을 실패했습니다.');
    }
  };

  return (
    <Button variant="outline-info" size="sm" onClick={updateLikes}>
      👍
    </Button>
  );
};

export default LikeButton;
