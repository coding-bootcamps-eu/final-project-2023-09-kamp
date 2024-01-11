<template>
  <div>
    <navbar />
    <div class="impressum-container">
      <h2 class="page-title">Impressum</h2>
      <h3 class="subheaders">Projekt KAMP</h3>
      <p class="flowing-text">Ein Prototyp für eine Reiseführer-App für barrierefreies Reisen</p>

      <p class="flowing-text">Diese Webapplikation wurde erstellt durch:</p>
      <ul class="flowing-text">
        <li>
          <img src="/src/assets/svg/github-mark.svg" class="github-icon" /><a
            href="https://github.com/czeopauli"
            class="github-links"
            >Paulina</a
          >
        </li>
        <li>
          <img src="/src/assets/svg/github-mark.svg" class="github-icon" /><a
            href="https://github.com/marijana29"
            class="github-links"
            >Marijana</a
          >
        </li>
        <li>
          <img src="/src/assets/svg/github-mark.svg" class="github-icon" /><a
            href="https://github.com/andreasullrich"
            class="github-links"
            >Andreas</a
          >
        </li>
        <li>
          <img src="/src/assets/svg/github-mark.svg" class="github-icon" /><a
            href="https://github.com/kristinnorwig"
            class="github-links"
            >Kristin</a
          >
        </li>
      </ul>
      <h3 class="subheaders">Bildnachweise</h3>
      <ul class="pic-sources">
        <li>
          Rollisegler: https://www.sta-g.de/mitgliedsschiff/wappen-von-ueckermuende-der-rollisegler/
        </li>
        <li>
          Bayerwald Tierpark: https://travelwithkids.de/ausflugsziele/bayerwald-tierpark-lohberg/
        </li>
        <li>
          Wandern am Breitenberg:
          https://pixabay.com/de/photos/allg%C3%A4u-breitenberg-forggensee-50647/
        </li>
        <li>
          Chinesischer Garten München:
          https://www.platzl.de/muenchen-umgebung/sehenswuerdigkeiten/der-englische-garten-muenchen
        </li>
        <li>
          Deutsches Museum Nürnberg:
          https://www.google.com/maps/contrib/116725575969840519056/photos/@49.4538858,11.0747283,17z/data=!3m1!4b1!4m3!8m2!3m1!1e1?entry=ttu
        </li>
        <li>DeafVentures: https://pixabay.com/de/photos/mann-brett-ozean-kitesurfer-5656765/</li>
        <li>Edersee: https://pixabay.com/de/photos/edersee-see-wasser-blau-fenster-928826/</li>
        <li>
          Insel Mainau: https://pixabay.com/de/photos/insel-mainau-blumen-mainau-insel-3729743/
        </li>
        <li>
          Schirn Frankfurt: https://pixabay.com/de/photos/glaskuppel-frankfurt-museum-schirn-544106/
        </li>
        <li>
          Wanderweg Bodensee:
          https://pixabay.com/de/photos/natur-landschaft-segeln-segelboote-3729589/
        </li>
        <li>Planetarium Stuttgart: https://www.ad-magazin.de/article/planetarien</li>
        <li>
          Mercedes-Benz-Museum:
          https://group.mercedes-benz.com/unternehmen/tradition/museen-historische-orte/mercedes-benz-museum.html
        </li>
        <li>
          Neue Galerie Kassel:
          https://www.reisen-fuer-alle.de/neue_galerie_kassel_249.html?action=detail&item_id=937
        </li>
        <li>
          Botanischer Garten Frankfurt: https://www.palmengarten.de/de/gaerten/palmengarten.html
        </li>
        <li>
          Bach Museum Leipzig: https://www.bachmuseumleipzig.de/de/bach-museum/ber-das-bach-museum
        </li>
        <li>
          Albrechtsburg Meissen:
          https://www.fotocommunity.de/photo/albrechtsburg-meissen-wittenberger-hobbyfotograf/46920516
        </li>
        <li>
          Naturerlebnispfad Guttauer Teiche:
          https://blog.synnatschke.de/europe/germany/unesco-biosphaerenreservat-guttauer-teiche/
        </li>
        <li>
          Semperoper und Residenzschloss Dresden:
          https://shop.skd.museum/kombiticket-residenzschloss-semperoper-01010000031.html
        </li>
        <li>
          Erlebnisbad Wonnemar:
          https://www.tripadvisor.de/Attraction_Review-g187365-d7075813-Reviews-WONNEMAR_Wismar-Wismar_Mecklenburg_West_Pomerania.html
        </li>
        <li>
          Ozeanum Stralsund:
          https://www.deutsches-meeresmuseum.de/presse/meldungen/post/sandtigerhai-niki-im-ozeaneum-stralsund-verstorben
        </li>
        <li>github Logo: https://github.com/logos</li>
        <li>
          Leute Saßen Um Einen Tisch Und Tranken Bier:
          https://www.pexels.com/de-de/foto/leute-sassen-um-einen-tisch-und-tranken-bier-3009767/
        </li>
        <li>
          Menschen, Die Während Ihrer Reitpause Einen Toast Haben:
          https://www.pexels.com/de-de/foto/menschen-die-wahrend-ihrer-reitpause-einen-toast-haben-3009746/
        </li>
        <li>
          Tochter, Mutter essen ein Eis:
          https://www.pexels.com/de-de/foto/liebe-essen-dessert-glucklich-7403005/
        </li>
        <li>
          Mann, Der Auf Grünem Gras Steht:
          https://www.pexels.com/de-de/foto/mann-der-auf-grunem-gras-steht-16010/
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '@/stores/mainStore'
import NavBar from '@/components/NavBar.vue'

export default {
  data() {
    const mainStore = useMainStore()
    return { mainStore }
  },
  components: {
    navbar: NavBar
  }
}
</script>

<style scoped>
li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  hyphens: auto;
  list-style-type: none;
}
.github-icon {
  width: 24px;
  margin-right: 0.5rem;
}
.github-links {
  color: var(--text-color);
}

.github-links:active {
  color: var(--highlight-color);
}
.pic-sources {
  font-size: 0.7rem;
}
</style>
