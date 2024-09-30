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
                    primary: '#03A6FF', 
                    secondary: '#F7F9F9', 
                    tertiary: '#EBF3F6',
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