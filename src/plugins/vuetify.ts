import { createVuetify } from "vuetify";

// Vuetify
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#6499E9', 
                    secondary: '#9EDDFF', 
                    tertiary: '#A6F6FF',
                    light: '#BEFFF7',
                    background: '#FFFFFF',
                    surface: '#FFFFFF',
                    error: '#B00020',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FB8C00',
                }
            },
        },
    },
    components,
    directives,
})