import {Gochi_Hand, Roboto} from "next/font/google";

export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
})

export const gochiHand = Gochi_Hand({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-gochi-hand',
})