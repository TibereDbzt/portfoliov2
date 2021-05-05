// styles
import '../styles/main.sass';

// logic
import './loader.js';

// components
import { SidebarMenu } from './SidebarMenu';
import { PaperCanvas } from './PaperCanvas.js';
import { DotCursor } from './DotCursor';

new SidebarMenu(document.querySelector('[data-sidebar-menu]'));
new PaperCanvas(document.querySelector('.cursor--canvas'));
new DotCursor(document.querySelector('.cursor'));