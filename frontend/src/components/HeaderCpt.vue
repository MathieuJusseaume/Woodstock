<template>
    <header class="headerlayout">
        <img class="headerlayout__img" src="../assets/logoWoodStockManager.png" alt="">

        <div class="headerlayout__account__buttons">
            <button @click="openEditConnectedUserAccount" class="headerlayout__account__buttons__useraccount" type="button">Mon compte</button>
            <button class="headerlayout__account__buttons__logout" type="button">Deconnexion</button>
        </div>
    </header>
</template>

<script>
import { useUtilsStore } from "@/stores/utilsStore";

export default {
    name: "HeaderCpt",
    data() {
        return {};
    },
    methods: {
        openEditConnectedUserAccount() {
            const utilsStore = useUtilsStore();
            utilsStore.setFormName("AccountForm");
        }
    },
};
</script>

<style>
.headerlayout {
    display: flex;
    justify-content: space-between;
}
.headerlayout__img {
    width: 200px;
}
.headerlayout__account__buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.headerlayout__account__buttons__useraccount, .headerlayout__account__buttons__logout {
    cursor: pointer;
    margin: .5rem 0;
    border-radius: 2rem;
    padding: .3rem .8rem;
    font-size: .7rem;
    font-family: 'Clowey', sans-serif;
    font-weight: 600;
    height: 42px;
    width: fit-content;
    min-width: 150px;
    align-self: center;
    transition: .2s;
    color: #fff;
}
.headerlayout__account__buttons__useraccount {
    border: solid 2px #bd9855;
    background-color: #bd9855;
}
.headerlayout__account__buttons__useraccount:hover {
    background-color:#fff;
    color: #bd9855;
    border: 2px solid #bd9855;
}
.headerlayout__account__buttons__logout {
    border: solid 2px #e14e5c;
    background-color: #e14e5c;
}
.headerlayout__account__buttons__logout:hover {
    background-color:#fff;
    color: #e14e5c;
    border: 2px solid #e14e5c;
}
</style>