import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

export const EASES = {
    markedInOut: CustomEase.create("custom", "M0,0 C0.408,0.034 0.346,0.12 0.426,0.536 0.508,0.966 0.686,1 1,1 "),
    markedIn: CustomEase.create("custom", "M0,0 C0.876,0 0.526,1 1,1 "),
    markedOut: CustomEase.create("custom", "M0,0 C0.11,0.494 0.072,0.602 0.184,0.778 0.282,0.932 0.504,1 1,1 ")
};