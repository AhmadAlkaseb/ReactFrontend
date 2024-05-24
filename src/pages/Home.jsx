import styled from 'styled-components';

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 73vh;
    color: #333;
    text-align: center;
    padding: 20px;
    position: relative;
    overflow: hidden;

    &::before {
        content: '📱🚗📺💻📷';
        font-size: 5em;
        position: absolute;
        top: 10%;
        left: 5%;
        opacity: 0.1;
        z-index: -1;
    }

    &::after {
        content: '🚲🎮⌚️📟📼';
        font-size: 5em;
        position: absolute;
        bottom: 10%;
        right: 5%;
        opacity: 0.1;
        z-index: -1;
    }
`;

const WelcomeMessage = styled.h1`
    font-size: 3em;
    margin-bottom: 20px;
    color: #fff;
    text-shadow: 2px 2px #333;
`;

const Gif = styled.img`
    width: 200px;
    height: auto;
    margin-bottom: 40px;
`;

const Home = () => {
    const email = localStorage.getItem('email');
    return (
        <HomeContainer>
            <Gif src="https://media.giphy.com/media/26xBwdIuRJiAIqHwA/giphy.gif" alt="Welcome Gif" />
            <WelcomeMessage>Welcome back, {email}!</WelcomeMessage>
        </HomeContainer>
    );
};

export default Home;
