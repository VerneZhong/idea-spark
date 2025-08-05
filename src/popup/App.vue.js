import { ref, onMounted } from 'vue';
import IdeaList from './components/IdeaList.vue';
import IdeaForm from './components/IdeaForm.vue';
import { loadIdeas, saveIdeas } from '../utils/storage';
const ideas = ref([]);
onMounted(async () => {
    ideas.value = await loadIdeas();
});
function addIdea(text) {
    const newIdea = { id: Date.now(), text };
    ideas.value.unshift(newIdea);
    saveIdeas(ideas.value);
}
function removeIdea(id) {
    ideas.value = ideas.value.filter(idea => idea.id !== id);
    saveIdeas(ideas.value);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "p-4 w-80" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "text-lg font-bold mb-4" },
});
/** @type {[typeof IdeaForm, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(IdeaForm, new IdeaForm({
    ...{ 'onAdd': {} },
}));
const __VLS_1 = __VLS_0({
    ...{ 'onAdd': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onAdd: (__VLS_ctx.addIdea)
};
var __VLS_2;
/** @type {[typeof IdeaList, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(IdeaList, new IdeaList({
    ...{ 'onRemove': {} },
    ideas: (__VLS_ctx.ideas),
}));
const __VLS_8 = __VLS_7({
    ...{ 'onRemove': {} },
    ideas: (__VLS_ctx.ideas),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_10;
let __VLS_11;
let __VLS_12;
const __VLS_13 = {
    onRemove: (__VLS_ctx.removeIdea)
};
var __VLS_9;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-80']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            IdeaList: IdeaList,
            IdeaForm: IdeaForm,
            ideas: ideas,
            addIdea: addIdea,
            removeIdea: removeIdea,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
