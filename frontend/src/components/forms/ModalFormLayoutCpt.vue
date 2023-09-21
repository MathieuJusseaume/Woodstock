<template>
    <div class="formLayout">
        <header class="formLayout__header">
            <h1 class="formLayout__title">{{ formTitle }}</h1>
            <div class="formLayout__closebutton">close modale button</div>
        </header>
    
        <!-- Switch "editCommand -> <EDtidCOmmandeform" -->
        <!-- Pour le login form puisqu pas la même tronche pas besoin du header -> le faire seul ? -->

        <!-- TODO CREER LES COMPOSANT POUR CHACUN DES FORMULAIRES -->
   <!--      <OrderCreateForm v-if="formNname === 'OrderCreateForm'" />
        <OrderUpdateForm v-if="formName === 'OrderUpdateForm'" />
        <ClientCreateForm v-if="formName === 'ClientCreateForm'" />
        <ClientUpdateForm v-if="formName === 'ClientUpdateForm'" /> -->

    </div>
</template>

<script>
export default {
    name: "ModalFormLayoutCpt",
/*     props: {
        formName: {
            type: String,
            required: true
        }
    }, */
    data() {
        return {
            infos: ""
        }
    },
    methods: {
        // example(){
            
        // }
    }
    
};
</script>

<style>

</style>