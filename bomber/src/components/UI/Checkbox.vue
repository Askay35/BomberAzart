<template>
    <div @click="changeState" class="checkbox-circle-wrap">
        <div class="checkbox-circle"></div>
        <div class="checkbox-circle-text prevent-select"><slot></slot></div>    
    </div>
</template>

<script>
export default {
    methods:{
        changeState(e){
            this.$emit('changeState');
            e.target.classList.toggle("checked");
        }
    }
}
</script>

<style lang="scss">
@import url("/src/assets/css/base.css");

    .checkbox-circle-wrap{
        display: flex;
        align-items: center;
        cursor: pointer;
        gap: 5px;
        &.checked{
            .checkbox-circle{
                background: var(--pink-color)!important;
            }
        }
    }
    .checkbox-circle{
        width:18px;
        pointer-events: none;       
        height: 18px;
        border: 3px solid #820156;
        background: var(--bet-win-color);
        border-radius: 50%;
        
    }
    .checkbox-circle-text{
        font-weight: 500;
        pointer-events: none;       
        font-size: 13px;
    }
</style>