<script>
export default {
  data() {
    return {
      deposite_prev: "",
      deposite: {
        size: 500,
      },
      deposite_status: false,
    };
  },
  methods: {
    depositeSizeBtnClick(val, el) {
      this.deposite.size = val;
      this.deposite_prev = val.toString();
      el.value = this.deposite_prev;
    },
    depositeSizeInput(e) {
      if (/\d/.test(e.target.value)) {
        this.deposite_prev = e.target.value;
      } else {
        e.target.value = this.deposite_prev;
      }
    },
    cancelDeposite() {
      this.deposite_status = false;
    },
    depositeSizeChange(e, min, max) {
      if (/\d/.test(e.target.value)) {
        this.deposite_prev = e.target.value;
        let new_dsize = Number(e.target.value);
        if (new_dsize <= max) {
          this.deposite.size = e.target.value = new_dsize;
        } else {
          this.deposite.size = e.target.value = max;
          return;
        }
        if (new_dsize >= min) {
          this.deposite.size = e.target.value = new_dsize;
        } else {
          this.deposite.size = e.target.value = min;
        }
      } else {
        e.target.value = this.deposite_prev;
      }
    },
  },
};
</script>

<style lang="scss">
.deposite-made-key {
  font-size: 10px;
  line-height: 11px;
  color: #fff;
}
.deposite-made-value {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #fff;
}

.deposite-made-icon {
  width: 80px;
  height: 20px;
}
.deposite-made-desc {
  width: 300px;
  color: #fff;
  padding: 10px;
  font-size: 12px;
  border-radius: 12px;
  line-height: 18px;
}

.deposite-made-card {
  display: flex;
  border-radius: 10px;
  flex: 1;
  padding: 20px;
}

.deposite-input-image {
  border: 1px solid #e6e6e6;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  img {
    height: 20px;
  }
}
.deposite-desc {
  display: flex;
  flex: 1 0 auto;
  max-width: max-content;
  justify-content: space-evenly;
  div > div:first-child {
    font-weight: 600;
  }
}
.deposite-divider {
  border-left: 1px solid #d5d9e3;
  width: 1px;
  margin: 0 30px;
}

.deposite-input-wrap {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-evenly;
}
.deposite-size-btn {
  border-radius: 8px;
  background-color: #edf0f7;
  color: rgba(7, 12, 25, 0.5);
  padding: 8px 10px;
  cursor: pointer;
}
.deposite-size-btns {
  font-size: 12px;
  gap: 7px;
  line-height: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px 0;
}
.deposite-input {
  height: 30px;
  border: 1px solid #e6e6e6;
}

.deposite-pay-form {
  height: max-content;
  padding: 20px;
  display: flex;
  & > .d-flex {
    width: 100%;
  }
}
</style>
