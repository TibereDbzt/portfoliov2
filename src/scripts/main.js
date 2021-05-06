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
    const slides = new SectionSlides(document.querySelector('[data-scroll-container'), document.querySelector('[data-sidebar-menu]'));
    const menu = new SidebarMenu(document.querySelector('[data-sidebar-menu]'), document.querySelector('[data-scroll-container'));
    slides.bindSectionSlide(menu.onSlideSection.bind(menu));
    menu.bindClickMenu(slides.onClickMenu.bind(slides));
}
navigation();
    

new PaperCanvas(document.querySelector('.cursor--canvas'));
new DotCursor(document.querySelector('.cursor'));