import styled from "styled-components";
import { Modal } from "./ui/modal";
import Slider from "react-slick";

const SlideItem = styled.div`
  margin-bottom: 40px;
`;

const TitleSlide = styled.h3`
  font-weight: bold;
  margin: 0;
  margin-bottom: 16px;
`;

interface RulesModalType {
  closeModal: (modal: "rulesModal" | "contactModal") => void;
}

export const RulesModal = ({ closeModal }: RulesModalType) => {
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
    <Modal
      label="rules-modal"
      title="Bienvenue !"
      closeModal={() => closeModal("rulesModal")}
    >
      <Slider {...settings} arrows={false}>
        <SlideItem>
          <p>
            Discover Words est un jeu de société inspiré du célèbre jeu
            Undercover. Cette version est uniquement jouable en hors ligne avec
            des amis. Faites défiler pour découvrir les différentes règles du
            jeu.
          </p>
        </SlideItem>
        <SlideItem>
          <p>
            <TitleSlide>Les rôles</TitleSlide>
            <u>Les courtois :</u> ils reçoivent tous le même mot secret. Leur
            but est de demarquer l'Imposteur et le Tricheur.
            <br />
            <br />
            <u>L'Imposteur :</u> il reçoit un mot légèrement différent de celui
            des Courtois. Son objectif est de se faire passer pour un Courtois !
            <br />
            <br />
            <u>Le Tricheur :</u> il ne reçoit aucun mot. Son but est de faire
            croire qu'il en a un, tout en essayant de deviner le mot des
            Courtois.
          </p>
        </SlideItem>
        <SlideItem>
          <p>
            <TitleSlide>Obtenez votre mot</TitleSlide>
            Passez le téléphone d'un joueur à l'autre pour recevoir un mot
            secret.
            <br /> Pour l'instant vous ne savez pas si vous êtes 1 Courtois ou
            un 1 Imposteur.
            <br />
            <br />
            <TitleSlide>Décrivez votre mot</TitleSlide>
            Chacun décrit son mot avec 1 seul autre mot. Le Tricheur doit
            improviser.
            <br /> Ecoutez attentivement, c'est votre chance de découvrir les
            rôles de vos amis et le vôtre !
          </p>
        </SlideItem>
        <SlideItem>
          <TitleSlide>Discussion</TitleSlide>
          Les joueurs non éliminés discutent et s'influencent pour décider qui
          éliminer ! Faites-vous des alliés et débusquez vos ennemis ! <br />
          <br /> Eliminez d'abord le Tricheur ! Plus il/elle reste longtemps,
          plus il lui sera facile de deviner correctement le mot des Courtois et
          de gagner !
        </SlideItem>
        <SlideItem>
          <TitleSlide>Votes</TitleSlide>
          Trouvez un joueur qui a un rôle différent du vôtre. Votez en le
          pointant du doigt en même temps que les autres joueurs restants. Le
          joueur avec le plus de votes est éliminé.
          <br />
          <br />
          <TitleSlide>Egalité des votes</TitleSlide>
          <u>Option 1 :</u> Pierre-feuille-ciseaux
          <br />
          <u>Option 2 :</u> Les joueurs désignés donnent 1 description de plus,
          et les joueurs restant revotent.
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
          En cas de victoire, les Courtois marquent 2 points, le Tricheur, gagne
          6 points, et l'Imposteur, 10 points.
        </SlideItem>
      </Slider>
    </Modal>
  );
};
