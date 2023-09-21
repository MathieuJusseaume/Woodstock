<template>
    <div class="clientpanelinfo">
        <div class="clientpanelinfo__list">
            <ul class="clientpanelinfo__list__a">
                <li>Nom du client :</li>
                <li>Téléphone :</li>
                <li>Email :</li>
            </ul>
            <ul class="clientpanelinfo__list__b">
                <li>Adresse de facturation :</li>
                <li>Adresse de livraison :</li>
            </ul>
        </div>
       
        <div class="clientpanelinfo__footer">
            <div class="clientpanelinfo__footer__buttons">
                <button type="submit" class="clientpanelinfo__footer__buttons__edit">Editer</button>
                <button type="submit" class="clientpanelinfo__footer__buttons__delete">Supprimer</button>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "ClientPanelInfoCpt",
    data() {
        return {
            infos: ""
        }
    },
};
</script>

<style scoped></style>