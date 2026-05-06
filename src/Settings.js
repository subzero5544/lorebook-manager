import { saveSettingsDebounced } from '../../../../../script.js';
import { extension_settings } from '../../../../extensions.js';


/** @readonly */
/** @enum {string} */
export const SORT = {
    /** Alphabetical by entry comment (title/memo) */
    ALPHABETICAL: 'alphabetical',
    /** According to prompt depth (position-depth-order) */
    PROMPT: 'prompt',
};
/** @readonly */
/** @enum {string} */
export const SORT_DIRECTION = {
    /** Alphabetical by entry comment (title/memo) */
    ASCENDING: 'ascending',
    /** According to prompt depth (position-depth-order) */
    DESCENDING: 'descending',
};

export class Settings {
    /**@type {Settings} */
    static #instance;
    static get instance() {
        if (!this.#instance) {
            this.#instance = new Settings();
        }
        return this.#instance;
    }
    /**@type {SORT} */
    sortLogic = SORT.ALPHABETICAL;
    /**@type {SORT_DIRECTION} */
    sortDirection = SORT_DIRECTION.ASCENDING;

    constructor() {
        Object.assign(this, extension_settings.lorebookManager ?? extension_settings.wordInfoDrawer ?? {});
        extension_settings.lorebookManager = this;
    }

    toJSON() {
        return {
            sortLogic: this.sortLogic,
            sortDirection: this.sortDirection,
        };
    }

    save() {
        saveSettingsDebounced();
    }
}
