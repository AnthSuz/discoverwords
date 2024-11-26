import styled from "styled-components";
import { Modal } from "../../components/ui/modal";
import { useState } from "react";
import Slider from "react-slick";
import { LinkButton } from "../../utils/styled";

const HomeContainer = styled.div`
  display: grid;
  height: 100%;
`;

const HomeContent = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
`;

const Button = styled.button`
  width: 60%;
  padding: 12px;
  background-color: white;
  border: 1px solid #e8e9ea;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 4px;
  color: #595959;

  &:hover {
    box-shadow: 0px 3px 8px 0px #e8e9ea;
  }
`;

const Footer = styled.footer`
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 8px;
  padding-bottom: 16px;
`;

const TextButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const SlideItem = styled.div`
  margin-bottom: 40px;
`;

const TitleSlide = styled.h3`
  font-weight: bold;
  margin: 0;
  margin-bottom: 16px;
`;

export const Home = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: any) => (
      <div>
        <ul style={{ padding: 0 }}>{dots}</ul>
      </div>
    ),
  };

  return (
    <>
      <HomeContainer>
        <HomeContent>
          <LinkButton to="create-game">
            <Button>PLAY</Button>
          </LinkButton>
        </HomeContent>
        <Footer>
          <TextButton onClick={() => setShowModal(true)}>Règles</TextButton>
          <p>-</p>
          <TextButton>Contact</TextButton>
          <p>-</p>
          <TextButton>Patch note</TextButton>
        </Footer>
      </HomeContainer>
      {showModal && (
        <Modal label="rules-modal" title="Bienvenue !" closeModal={closeModal}>
          <Slider {...settings} arrows={false}>
            <SlideItem>
              <p>
                Discover Words est un jeu de société inspiré du célèbre jeu
                Undercover. Cette version est uniquement jouable en hors ligne
                avec des amis. Faites défiler pour découvrir les différentes
                règles du jeu.
              </p>
            </SlideItem>
            <SlideItem>
              <p>
                <TitleSlide>Les rôles</TitleSlide>
                <u>Les courtois :</u> ils reçoivent tous le même mot secret.
                Leur but est de demarquer l'Imposteur et le Tricheur.
                <br />
                <br />
                <u>L'Imposteur :</u> il reçoit un mot légèrement différent de
                celui des Courtois. Son objectif est de se faire passer pour un
                Courtois !
                <br />
                <br />
                <u>Le Tricheur :</u> il ne reçoit aucun mot. Son but est de
                faire croire qu'il en a un, tout en essayant de deviner le mot
                des Courtois.
              </p>
            </SlideItem>
            <SlideItem>
              <p>
                <TitleSlide>Obtenez votre mot</TitleSlide>
                Passez le téléphone d'un joueur à l'autre pour recevoir un mot
                secret.
                <br /> Pour l'instant vous ne savez pas si vous êtes 1 Courtois
                ou un 1 Imposteur.
                <br />
                <br />
                <TitleSlide>Décrivez votre mot</TitleSlide>
                Chacun décrit son mot avec 1 seul autre mot. Le Tricheur doit
                improviser.
                <br /> Ecoutez attentivement, c'est votre chance de découvrir
                les rôles de vos amis et le vôtre !
              </p>
            </SlideItem>
            <SlideItem>
              <TitleSlide>Discussion</TitleSlide>
              Les joueurs non éliminés discutent et s'influencent pour décider
              qui éliminer ! Faites-vous des alliés et débusquez vos ennemis !{" "}
              <br />
              <br /> Eliminez d'abord le Tricheur ! Plus il/elle reste
              longtemps, plus il lui sera facile de deviner correctement le mot
              des Courtois et de gagner !
            </SlideItem>
            <SlideItem>
              <TitleSlide>Votes</TitleSlide>
              Trouvez un joueur qui a un rôle différent du vôtre. Votez en le
              pointant du doigt en même temps que les autres joueurs restants.
              Le joueur avec le plus de votes est éliminé.
              <br />
              <br />
              <TitleSlide>Egalité des votes</TitleSlide>
              <u>Option 1 :</u> Pierre-feuille-ciseaux
              <br />
              <u>Option 2 :</u> Les joueurs désignés donnent 1 description de
              plus, et les joueurs restant revotent.
            </SlideItem>
            <SlideItem>
              <TitleSlide>Victoire</TitleSlide>
              Les Courtois gagnent s'ils éliminent tous les autres rôles.
              L'Imposteur & le Tricheur gagnent lorsqu'il ne reste plus qu'1
              Courtois. <br /> Le tricheur gagne aussi s'il devine le mot des
              Courtois.
              <br />
              <br />
              <TitleSlide>Point</TitleSlide>
              En cas de victoire, les Courtois marquent 2 points, le Tricheur,
              gagne 6 points, et l'Imposteur, 10 points.
            </SlideItem>
          </Slider>
        </Modal>
      )}
    </>
  );
};
