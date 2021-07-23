// styles
import '../styles/main.sass';

// logic
import './loader.js';

// components
import { SectionSlides } from './SectionSlides';
import { SidebarMenu } from './SidebarMenu';
import { PaperCanvas } from './PaperCanvas.js';
import { DotCursor } from './DotCursor';

const navigation = () => {
    const slides = new SectionSlides(document.querySelector('[data-scroll-container'));
    const menu = new SidebarMenu(document.querySelector('[data-sidebar-menu]'));
    slides.bindSectionSlide(menu.onSlideSection.bind(menu));
    menu.bindClickMenu(slides.onClickMenu.bind(slides));
};
navigation();

new PaperCanvas(document.querySelector('.cursor--canvas'));
new DotCursor(document.querySelector('.cursor'));

// const deezerDataEl = document.querySelector('[data-deezer-container]');
// const DEEZER_TOKEN = '';
// const DEEZER_REQUEST_HISTORY = 'https://api.deezer.com/user/926382981/history';

// const request = new Request(DEEZER_REQUEST_HISTORY + '?access_token=' + DEEZER_TOKEN);
// const URL = request.url;
// const method = request.method;
// const credentials = request.credentials;

// fetch(request)
//     .then(response => console.log(typeof response));