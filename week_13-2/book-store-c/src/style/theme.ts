export type ThemeName= "light" | "dark";
type ColorKey = "primary" | "background" | "secondary" | "third";

export interface Theme {
    name : ThemeName;
    color : Record<ColorKey, string>;
}

export const light : Theme = {
    name : 'light',
    color : {
        primary : 'brown',
        background : 'lightgray',
        secondary : 'blue',
        third : 'green'
    }
};

export const dark : Theme = {
    name : 'dark',
    color : {
        primary : 'coral',
        background : 'midnightblue',
        secondary : 'darkblue',
        third : 'darkgreen'
    }
}

export const getTheme = (ThemeName : ThemeName) : Theme => {
    switch(ThemeName) {
        case "light" :
            return light;
        case "dark" :
            return dark;
    }
}