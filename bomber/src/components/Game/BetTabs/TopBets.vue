<template>
  <div
    style="overflow: visible"
    class="d-flex justify-content-between position-relative flex-row"
  >
    <div class="custom-select" style="width: 50%">
      <select>
        <option data-by="win" selected disabled>Выигрыш</option>
        <option data-by="win">Выигрыш</option>
        <option data-by="bet_size">Ставка</option>
        <option data-by="coef">Коэффициент</option>
      </select>
    </div>
    <div class="custom-select">
      <select>
        <option data-time="year" selected disabled>Год</option>
        <option data-time="year">Год</option>
        <option data-time="month">Месяц</option>
        <option data-time="day">День</option>
      </select>
    </div>
  </div>
  <div id="top-bets-wrap" class="hide-scroll">
    <div v-if="loading" id="top-bets-loading">Загрузка...</div>
    <Bet v-else v-for="bet in bets[current_time][current_by]" :bet="bet" />
  </div>
</template>

<script>
import Bet from "../UI/Bet.vue";

import axios from "axios";
import config from "../../../config";

export default {
  components: { Bet },
  data() {
    return {
      loading: true,
      current_time: "year",
      current_by: "win",
      bets: {
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
    this.getTopBets();
    let x, j, l, ll, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select");
    l = x.length;

    let instanse = this;
    for (let i = 0; i < l; i++) {
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

        if (selElmnt.options[j].hasAttribute("data-by")) {
          c.dataset.by = selElmnt.options[j].dataset.by;
        }
        if (selElmnt.options[j].hasAttribute("data-time")) {
          c.dataset.time = selElmnt.options[j].dataset.time;
        }
        c.addEventListener("click", function (e) {
          /* When an item is clicked, update the original select box,
        and the selected item: */


          if (e.target.hasAttribute("data-time")) {
            instanse.current_time = e.target.dataset.time;
          }
          if (e.target.hasAttribute("data-by")) {
            instanse.current_by = e.target.dataset.by;
          }
          if (
            instanse.bets[instanse.current_time][instanse.current_by].length < 1
          ) {
            instanse.getTopBets();
          }
          
          e.target.parentNode.parentNode.getElementsByClassName('select-selected')[0].innerHTML = e.target.innerHTML;
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
      let x,
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
  methods: {
    getTopBets() {
      this.loading = true;
      axios
        .get(config.PHP_HOST + "/bets/top", {
          params: {
            time: this.current_time,
            by: this.current_by,
          },
        })
        .then((resp) => {
          if (resp.data.success) {
            this.bets[this.current_time][this.current_by] = resp.data.data;
          } else {
            alert("Не удалось загрузить данные о ставках");
          }
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss">
@import url("/src/assets/css/base.css");

#top-bets-loading {
  text-align: center;
  margin-top: 10px;
  color: var(--pink-color);
  font-size: 18px;
  font-weight: 800;
}
#top-bets-wrap {
  margin-top: 20px;
}
</style>
