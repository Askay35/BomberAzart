<template>
  <header-desktop></header-desktop>
  <main id="bomber-main">
    <Chat />
    <Game />
    <BetsPanel>
      <Tab :active="true" name="Все">
        <AllBets />
      </Tab>
      <Tab name="Мои">
        
      </Tab>
      <Tab name="Топ" style="overflow: visible">
        <div
          style="overflow: visible"
          class="d-flex justify-content-between position-relative"
        >
          <div class="custom-select" style="width: 50%" ref="top_bets_sort">
            <select>
              <option selected disabled value="1">Выигрыш</option>
              <option value="1">Выигрыш</option>
              <option value="2">Ставка</option>
              <option value="3">Коэффициент</option>
            </select>
          </div>
          <div class="custom-select" ref="top_bets_time">
            <select>
              <option selected disabled value="1">Год</option>
              <option value="1">Год</option>
              <option value="2">Месяц</option>
              <option value="3">День</option>
            </select>
          </div>
        </div>
        <div id="top-bets-wrap">
          <Bet
            v-for="bet in $store.state.game.bets.prev"
            :bet="bet"
          />
        </div>
      </Tab>
    </BetsPanel>
  </main>
  <div
    v-if="overlay_shown"
    @click="hideModal(current_modal)"
    id="modal-overlay"
  ></div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Chat from "../components/Chat/Chat.vue";
import BetsPanel from "../components/Game/BetsPanel.vue";
import Game from "../components/Game/Game.vue";
import HeaderDesktop from "../components/HeaderDesktop.vue";
import Coef from "../components/UI/Coef.vue";
import Tab from "../components/UI/Tab.vue";
import Bet from "../components/Game/UI/Bet.vue";
import AllBets from '../components/Game/BetTabs/AllBets.vue';

export default {
  data() {
    return {
      overlay_shown: false,
      current_modal: null,
      top_bets: {
        day: {
          coef: [],
          win: [],
          bet_size: [],
        },
        month: {
          coef: [],
          win: [],
          bet_size: [],
        },
        year: {
          coef: [],
          win: [],
          bet_size: [],
        },
      },
    };
  },
  mounted() {
    var x, i, j, l, ll, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      ll = selElmnt.length;
      /* For each element, create a new DIV that will act as the selected item: */
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < ll; j++) {
        /* For each option in the original select element,
    create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
          /* When an item is clicked, update the original select box,
        and the selected item: */
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function (e) {
        /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }

    function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
  except the current select box: */
      var x,
        y,
        i,
        xl,
        yl,
        arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i);
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }

    /* If the user clicks anywhere outside the select box,
then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
  },
  components: { Chat, BetsPanel, Game, HeaderDesktop, Coef, Tab, Bet, AllBets },
  provide() {
    return {
      login_modal: ref(null),
      showModal: this.showModal,
      hideModal: this.hideModal,
      toggleModal: (modal) => {
        this.current_modal.shown = false;
        this.current_modal = modal;
        if (modal.overlay) {
          this.overlay_shown = true;
        } else {
          this.overlay_shown = false;
        }
        modal.shown = true;
      },
      showPassword: (target, id) => {
        let el = document.getElementById(id);
        if (el.getAttribute("type") == "text") {
          target.classList.remove("active");
          el.setAttribute("type", "password");
        } else {
          el.setAttribute("type", "text");
          target.classList.add("active");
        }
      },
    };
  },
  methods: {
    showModal(modal) {
      this.current_modal = modal;
      if (modal.overlay) {
        this.overlay_shown = true;
      }
      modal.shown = true;
    },
    hideModal(modal) {
      if (modal.overlay) {
        this.overlay_shown = false;
      }
      modal.shown = false;
    },
  },
};
</script>

<style lang="scss">
@import url("/src/assets/css/base.css");

#bomber-main {
  display: flex;
  height: calc(100vh - 70px);
  widows: 100%;
}

#bets-wrap {
  width: 320px;
}
</style>
