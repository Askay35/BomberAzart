<template>
  <header>
    <DefaultModal id="feedback-modal" ref="feedback_modal">
      <template #header> Позвонить в службу поддержки </template>
      <template #body>
        <div class="modal-contact-item">
          <div>Телеграм:</div>
          <div>@bombergametg</div>
        </div>
        <div class="modal-contact-item">
          <div>Телефон:</div>
          <div>8 (988) 830 36-75</div>
        </div>
      </template>
    </DefaultModal>
    <DefaultModal id="howtoplay_modal" ref="howtoplay_modal">
      <template #header>Как играть?</template>
      <template #subheader>
        <div class="modal-subheader">
          Bomber – игра где ты можешь выиграть в несколько раз больше буквально
          за несколько секунд!
        </div>
      </template>
      <template #body>
        <div
          @scroll="howtoplayScroll"
          class="hide-scroll"
          id="howtoplay-content"
          :style="
            'mask-image: linear-gradient(to top, transparent 0%, black ' +
            howtoplay_scroll.toString() +
            '%)'
          "
        >
          <p>
            <span style="white-space: pre-wrap"
              >Как играть и какие правила?<br
            /></span>
          </p>
          <ul>
            <li>
              <span style="white-space: pre-wrap"
                >Чтобы сделать ставку, нужно выбрать желаемую сумму и нажать на
                кнопку &laquo;Ставка&raquo;.</span
              >
            </li>
            <li>
              <span style="white-space: pre-wrap"
                >При этом нет нужды ограничивать себя только одной ставкой за
                раз. Вы можете делать две ставки одновременно, используя как
                левую, так и правую панель ставки.</span
              >
            </li>
            <li>
              <span style="white-space: pre-wrap"
                >Чтобы вывести выигрыш, нужно нажать кнопку &laquo;Вывод&raquo;.
                Ваш выигрыш складывается из совокупности вашей ставки,
                умноженной на множитель кэшаута.</span
              >
            </li>
            <li>
              <span style="white-space: pre-wrap"
                >Если не сделать Вывод до того, как коэффициент улетит, то
                ставка будет потеряна.</span
              >
            </li>
          </ul>
          <p>
            <span style="white-space: pre-wrap">Автоставка и Автовывод</span>
          </p>
          <ul>
            <li>
              <span style="white-space: pre-wrap"
                >Автоматическую Ставку можно активировать на панели любой
                ставки, если поставить галочку в строчке
                &laquo;Автоставка&raquo;. В таком случае ставки делаются
                автоматически. Тем не менее чтобы вывести выигрыш все равно
                необходимо нажимать кнопку &laquo;Вывод&raquo; для каждого
                раунда.</span
              >
            </li>
            <li>
              <span style="white-space: pre-wrap"
                >Если желаете полностью автоматизировать игру, то имеется
                возможность и настройки автоматического вывода выигрыша. Для
                этого необходимо активировать на панели ставки
                &laquo;Автовывод&raquo;. Тогда средства будут автоматически
                выводиться при достижении заданного вами коэффициента.</span
              >
            </li>
          </ul>
          <p>
            <span style="white-space: pre-wrap">Интерфейс нашей игры</span>
          </p>
          <ul>
            <li>
              <span style="white-space: pre-wrap"
                >Справа находится панель &laquo;Лайв Ставки&raquo; На ней
                отображаются ставки, которые были сделаны в текущем
                раунде.</span
              >
            </li>
            <li>
              <span style="white-space: pre-wrap"
                >Панели &laquo;Мои ставки&raquo; содержит информацию о сделанных
                ставках и выводе средств за все время игры.</span
              >
            </li>
            <li>
              <span style="white-space: pre-wrap"
                >Панель &laquo;Топ&raquo; содержит игровую статистику. Тут можно
                изучить выигрыши других игроков как по сумме, так и по
                коэффициенту обналичивания.</span
              >
            </li>
            <li>
              <span style="white-space: pre-wrap"
                >Слева находится панель чата. Он предназначен для общения с
                другими игроками</span
              >
            </li>
          </ul>
        </div>
      </template>
    </DefaultModal>
    <DefaultModal id="login_modal" ref="login_modal">
      <template #header> Вход </template>
      <template #body>
        <input
          type="email"
          autocomplete="nope"
          style="margin-bottom: 10px"
          v-model="loginData.email"
          :class="{ 'error-input': loginErrors.email != '' }"
          :placeholder="loginErrors.email == '' ? 'E-mail' : loginErrors.email"
          class="text-input"
        />
        <div class="position-relative w-100" style="margin-bottom: 10px">
          <input
            type="password"
            autocomplete="nope"
            id="login-password-input"
            :class="{ 'error-input': loginErrors.password != '' }"
            :placeholder="
              loginErrors.password == '' ? 'Пароль' : loginErrors.password
            "
            v-model="loginData.password"
            class="text-input w-100"
          />
          <ShowPassword
            @click="showPassword($event.target, 'login-password-input')"
            class="show-password"
          />
        </div>
        <div class="d-flex justify-content-between" style="margin-bottom: 20px">
          <div class="d-flex" style="gap: 10px">
            <img src="@/assets/images/vk.svg" role="button" />
            <img src="@/assets/images/google.svg" role="button" />
            <img src="@/assets/images/yandex.svg" role="button" />
          </div>
          <div
            role="button"
            style="height: max-content; font-weight: 500; font-size: 12px"
          >
            Забыли пароль?
          </div>
        </div>
        <div
          role="button"
          class="modal-button pink-button"
          style="margin-bottom: 10px"
          @click="login"
        >
          Войти
        </div>
        <div
          role="button"
          @click="toggleModal($refs.reg_modal)"
          class="modal-button dark-button"
        >
          Регистрация
        </div>
      </template>
    </DefaultModal>
    <DefaultModal id="reg_modal" ref="reg_modal">
      <template #header> Регистрация </template>
      <template #body>
        <input
          type="email"
          autocomplete="nope"
          style="margin-bottom: 10px"
          v-model="regData.email"
          :class="{ 'error-input': regErrors.email != '' }"
          :placeholder="regErrors.email == '' ? 'E-mail' : regErrors.email"
          class="text-input"
        />
        <div class="position-relative w-100" style="margin-bottom: 10px">
          <input
            type="password"
            autocomplete="nope"
            id="reg-password-input"
            :class="{ 'error-input': regErrors.password != '' }"
            :placeholder="
              regErrors.password == '' ? 'Пароль' : regErrors.password
            "
            v-model="regData.password"
            class="text-input w-100 password-input"
          />
          <ShowPassword
            @click="showPassword($event.target, 'reg-password-input')"
            class="show-password"
          />
        </div>
        <div class="position-relative w-100" style="margin-bottom: 10px">
          <input
            type="password"
            autocomplete="nope"
            id="reg-password-repeat-input"
            :class="{ 'error-input': regErrors.password_repeat != '' }"
            :placeholder="
              regErrors.password_repeat == ''
                ? 'Повторите пароль'
                : regErrors.password_repeat
            "
            v-model="regData.password_repeat"
            class="text-input w-100 password-input"
          />
          <ShowPassword
            @click="showPassword($event.target, 'reg-password-repeat-input')"
            class="show-password"
          />
        </div>
        <div class="d-flex justify-content-between" style="margin-bottom: 20px">
          <div class="d-flex" style="gap: 10px">
            <img src="@/assets/images/vk.svg" role="button" />
            <img src="@/assets/images/google.svg" role="button" />
            <img src="@/assets/images/yandex.svg" role="button" />
          </div>
          <div
            role="button"
            @click="toggleModal($refs.login_modal)"
            style="height: max-content; font-weight: 500; font-size: 12px"
          >
            Уже есть аккаунт?
          </div>
        </div>
        <div
          role="button"
          class="modal-button pink-button"
          style="margin-bottom: 10px"
          @click="register"
        >
          Зарегистрироваться
        </div>
      </template>
    </DefaultModal>
    <DefaultModal id="settings_modal" ref="settings_modal">
      <template #header>Настройки</template>
      <template #body>
        <input
          type="text"
          v-model="settingsData.name"
          :class="{ 'error-input': settingsErrors.name != '' }"
          :placeholder="
            settingsErrors.name == '' ? 'Имя пользователя' : settingsErrors.name
          "
          autocomplete="nope"
          style="margin-bottom: 10px"
          class="text-input"
        />
        <div class="d-flex" style="gap: 10px">
          <input
            type="email"
            autocomplete="nope"
            style="margin-bottom: 10px"
            v-model="settingsData.email"
            :readonly="!settingsState.emailChange"
            :class="{ 'error-input': settingsErrors.email != '' }"
            :placeholder="
              settingsErrors.email == '' ? 'E-mail' : settingsErrors.email
            "
            class="text-input"
          />
          <div
            v-if="!settingsState.emailChange"
            @click="
              settingsState.emailChange = true;
              settingsData.email = '';
            "
            class="modal-button pink-button"
          >
            Изменить
          </div>
          <div
            v-else
            @click="settingsState.emailChange = false"
            class="modal-button pink-button"
          >
            Х
          </div>
        </div>
        <div class="d-flex" style="margin-bottom: 10px; gap: 10px">
          <div class="position-relative w-100">
            <input
              type="password"
              autocomplete="nope"
              v-model="settingsData.current_password"
              :readonly="!settingsState.passwordChange"
              :class="{ 'error-input': settingsErrors.current_password != '' }"
              :placeholder="
                settingsErrors.current_password == ''
                  ? 'Текущий пароль'
                  : settingsErrors.current_password
              "
              id="settings-current-password"
              class="text-input"
            />
            <ShowPassword
              v-if="settingsState.passwordChange"
              @click="showPassword($event.target, 'settings-current-password')"
              class="show-password"
            />
          </div>
          <div
            v-if="!settingsState.passwordChange"
            @click="
              settingsState.passwordChange = true;
              settingsData.current_password = '';
            "
            class="modal-button pink-button"
          >
            Изменить
          </div>
          <div
            v-else
            @click="
              settingsState.passwordChange = false;
              settingsData.new_password = '';
              settingsData.new_password_confirm = '';
            "
            class="modal-button pink-button"
          >
            Х
          </div>
        </div>

        <div
          class="position-relative w-100"
          style="margin-bottom: 10px"
          v-if="settingsState.passwordChange"
        >
          <input
            type="password"
            autocomplete="nope"
            v-model="settingsData.new_password"
            :class="{ 'error-input': settingsErrors.new_password != '' }"
            :placeholder="
              settingsErrors.new_password == ''
                ? 'Новый пароль'
                : settingsErrors.new_password
            "
            id="settings-new-password"
            class="text-input"
          />
          <ShowPassword
            v-if="settingsState.passwordChange"
            @click="showPassword($event.target, 'settings-new-password')"
            class="show-password"
          />
        </div>

        <div
          class="position-relative w-100"
          style="margin-bottom: 20px"
          v-if="settingsState.passwordChange"
        >
          <input
            type="password"
            autocomplete="nope"
            v-model="settingsData.new_password_confirm"
            :class="{
              'error-input': settingsErrors.new_password_confirm != '',
            }"
            :placeholder="
              settingsErrors.new_password_confirm == ''
                ? 'Повторите пароль'
                : settingsErrors.new_password_confirm
            "
            id="settings-new-password-confirm"
            class="text-input"
          />
          <ShowPassword
            v-if="settingsState.passwordChange"
            @click="
              showPassword($event.target, 'settings-new-password-confirm')
            "
            class="show-password"
          />
        </div>
        <div
          role="button"
          style="height: 45px"
          class="modal-button pink-button"
          @click="editSettings"
        >
          Сохранить
        </div>
      </template>
    </DefaultModal>
    <Modal id="deposite_modal" ref="deposite_modal">
      <template #header>
        <svg
          width="94"
          height="25"
          viewBox="0 0 94 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          class="icon icon-payment-p2p sm icon-type-color icon PaymentsIconsRow_icon_Egc0f PaymentsIconsRow_iconBase_zqT5H"
          icon="payment/p2p"
        >
          <g fill-rule="evenodd" class="p2p_svg__mono">
            <path
              clip-rule="evenodd"
              d="M21.036 10.437a4.85 4.85 0 00-.751-.268 4.257 4.257 0 00-1.23-.142c-.278.01-.548.053-.798.185-.163.087-.298.2-.369.376-.086.21-.043.395.099.564.129.154.295.268.467.364.191.107.383.21.575.313.127.069.255.137.382.207.357.197.698.42.985.715.307.314.513.68.587 1.119.037.224.04.45.016.677a2.68 2.68 0 01-.32 1.048c-.274.49-.671.847-1.157 1.115a4.327 4.327 0 01-1.32.453 6.092 6.092 0 01-1.274.096 7.263 7.263 0 01-2.006-.324 6.218 6.218 0 01-.258-.092l-.108-.04c.139-.641.274-1.279.41-1.92a5.5 5.5 0 001.058.41c.286.074.575.12.87.136.228.012.453.018.677-.013.299-.04.582-.117.819-.314a.668.668 0 00.224-.743.747.747 0 00-.206-.299 2.387 2.387 0 00-.538-.37l-.356-.185c-.148-.076-.297-.153-.444-.233a3.817 3.817 0 01-1.037-.792 2.032 2.032 0 01-.514-1.014 2.387 2.387 0 01.059-1.032c.163-.6.517-1.072 1.009-1.439.452-.336.963-.542 1.51-.665.49-.108.988-.145 1.49-.12a6.133 6.133 0 011.79.363c.04.015.046.028.04.07-.126.586-.252 1.172-.375 1.757.003.006 0 .019-.006.037zm7.986 6.684h-2.031c-.043 0-.061-.009-.07-.055l-.141-.676-.112-.532c-.006-.034-.021-.046-.058-.046h-2.818c-.034 0-.05.012-.059.043-.144.407-.292.813-.44 1.22-.012.034-.027.046-.064.046h-2.32a7625.408 7625.408 0 011.703-4.076l.004-.01 1.677-4.01c.154-.37.425-.593.822-.657a.933.933 0 01.16-.013h1.867c.043 0 .056.016.065.056l.59 2.838c.09.425.178.85.267 1.277l.266 1.277.31 1.488.001.003a1119.255 1119.255 0 01.35 1.678v.002l.031.147zm-3.417-6.38v-.004h-.016c-.397 1.094-.791 2.185-1.188 3.285.63-.003 1.256-.003 1.887-.003-.227-1.1-.455-2.189-.683-3.278zM1.021 8.5l-.022.107c.015.003.027.006.036.015l.384.102c.238.062.476.124.712.194.387.114.76.262 1.117.45a.886.886 0 01.464.573l.134.51.134.51 1.43 5.546.08.308.08.308c.019.003.031.003.047.003h2.3c.038.003.053-.012.066-.046l1.812-4.33.001-.003 1.814-4.334.007-.02a.333.333 0 01.011-.033h-.064l-1.122-.001c-.373 0-.747 0-1.121-.002-.05 0-.07.016-.09.062l-.63 1.597c-.531 1.349-1.063 2.698-1.597 4.048-.034.083-.068.166-.104.261l-.013-.061-.142-.755-.175-.934-.163-.868-.163-.87-.1-.535L5.94 9.23c-.108-.533-.526-.872-1.071-.872H1.05l-.03.142zm9.767 8.395l-.047.22.004.002c.008.002.013.004.018.001h2.203c.025 0 .034-.009.04-.034l.035-.164.036-.165c.286-1.35.575-2.7.864-4.049a1531.36 1531.36 0 00.93-4.353h-.764c-.484 0-.968.002-1.452 0-.04 0-.046.022-.051.048l-.001.004c-.053.234-.102.468-.151.702a3479.497 3479.497 0 00-.815 3.807l-.271 1.268c-.09.416-.178.831-.266 1.246l-.266 1.247-.046.22z"
              fill="#fff"
            ></path>
            <path
              d="M40.01 8.188h4.439v7.987H40.01V8.188z"
              fill="#B0D3F5"
            ></path>
            <path
              d="M40.292 12.182c0-1.623.761-3.063 1.93-3.994a5.037 5.037 0 00-3.127-1.086 5.073 5.073 0 00-5.073 5.08 5.073 5.073 0 005.073 5.08c1.183 0 2.268-.41 3.128-1.087a5.075 5.075 0 01-1.93-3.993zM50.437 12.182a5.073 5.073 0 01-5.073 5.08 5.037 5.037 0 01-3.128-1.087 5.054 5.054 0 001.93-3.993c0-1.623-.76-3.063-1.93-3.994a5.037 5.037 0 013.128-1.086c2.804 0 5.073 2.286 5.073 5.08z"
              fill="#fff"
            ></path>
            <path
              clip-rule="evenodd"
              d="M58.91 7.002c.336-.002 1.334-.092 1.756 1.336.285.962.738 2.537 1.36 4.727h.253a945.234 945.234 0 011.375-4.727c.427-1.443 1.494-1.336 1.92-1.336h3.294v10.26h-3.356v-6.046h-.225l-1.872 6.046H60.89l-1.871-6.051h-.225v6.051h-3.357V7.002h3.474zm14.778 0v6.05h.268l2.276-4.975c.442-.99 1.384-1.075 1.384-1.075h3.248v10.26h-3.427v-6.051h-.268l-2.231 4.976c-.442.985-1.428 1.075-1.428 1.075h-3.248V7.002h3.426zm19.02 4.875c-.478 1.357-1.979 2.329-3.64 2.329h-3.594v3.056h-3.259v-5.385h10.493z"
              fill="#fff"
            ></path>
            <path
              clip-rule="evenodd"
              d="M89.225 7.002h-7.18c.17 2.284 2.134 4.24 4.168 4.24h6.723c.387-1.899-.948-4.24-3.711-4.24z"
              fill="#B0D3F5"
            ></path>
          </g>
          <g fill-rule="evenodd" class="p2p_svg__color">
            <path
              clip-rule="evenodd"
              d="M21.036 10.437a4.85 4.85 0 00-.751-.268 4.257 4.257 0 00-1.23-.142c-.278.01-.548.053-.798.185-.163.087-.298.2-.369.376-.086.21-.043.395.099.564.129.154.295.268.467.364.191.107.383.21.575.313.127.069.255.137.382.207.357.197.698.42.985.715.307.314.513.68.587 1.119.037.224.04.45.016.677-.037.37-.139.721-.32 1.048-.274.49-.671.847-1.157 1.115a4.327 4.327 0 01-1.32.453 6.092 6.092 0 01-1.274.096 7.263 7.263 0 01-2.006-.324 6.275 6.275 0 01-.258-.092l-.108-.04c.139-.641.274-1.279.41-1.92a5.5 5.5 0 001.058.41c.286.074.575.12.87.136.228.012.453.018.677-.013.299-.04.582-.117.819-.314a.668.668 0 00.224-.743.747.747 0 00-.206-.299 2.387 2.387 0 00-.538-.37l-.356-.185c-.148-.076-.297-.153-.444-.233a3.817 3.817 0 01-1.037-.792 2.032 2.032 0 01-.514-1.014 2.387 2.387 0 01.059-1.032c.163-.6.517-1.072 1.009-1.439.452-.336.963-.542 1.51-.665.49-.108.988-.145 1.49-.12a6.133 6.133 0 011.79.363c.04.015.046.028.04.07-.126.586-.252 1.172-.375 1.757.003.006 0 .019-.006.037zm7.986 6.684h-2.031c-.043 0-.061-.009-.07-.055l-.141-.676-.112-.532c-.006-.034-.021-.046-.058-.046h-2.818c-.034 0-.05.012-.059.043-.144.407-.292.813-.44 1.22-.012.034-.027.046-.064.046h-2.32a7625.408 7625.408 0 011.703-4.076l.004-.01 1.677-4.01c.154-.37.425-.593.822-.657a.933.933 0 01.16-.013h1.867c.043 0 .056.016.065.056l.59 2.838c.09.425.178.85.267 1.277l.266 1.277.31 1.488.001.003.31 1.485.04.193v.002l.031.147zm-3.417-6.38v-.004h-.016c-.397 1.094-.791 2.185-1.188 3.285.63-.003 1.256-.003 1.887-.003-.227-1.1-.455-2.189-.683-3.278zM1.021 8.5l-.022.107c.015.003.027.006.036.015l.384.102c.238.062.476.124.712.194.387.114.76.262 1.117.45a.886.886 0 01.464.573l.134.51.134.51 1.43 5.546.08.308.08.308c.019.003.031.003.047.003h2.3c.038.003.053-.012.066-.046l1.812-4.33.001-.003 1.814-4.334a.333.333 0 01.018-.052h-.064c-.374-.002-.748-.002-1.122-.002-.373 0-.747 0-1.121-.002-.05 0-.07.016-.09.062l-.63 1.597c-.531 1.349-1.063 2.698-1.597 4.048-.034.083-.068.166-.104.261l-.013-.061-.142-.755-.175-.934-.163-.868-.163-.87-.1-.535A147.82 147.82 0 005.94 9.23c-.108-.533-.526-.872-1.071-.872H1.05l-.03.142zm9.767 8.395l-.047.22.004.002c.008.002.013.004.018.001h2.203c.025 0 .034-.009.04-.034l.035-.164.036-.165c.286-1.35.575-2.7.864-4.049a1531.36 1531.36 0 00.93-4.353h-.764c-.484 0-.968.002-1.452 0-.04 0-.046.022-.051.048l-.001.004c-.053.234-.102.468-.151.702a3479.497 3479.497 0 00-.815 3.807l-.271 1.268c-.09.416-.178.831-.266 1.246l-.266 1.247-.046.22z"
              fill="url(#p2p_svg__paint0_linear_2456_196)"
            ></path>
            <path
              d="M40.01 8.188h4.439v7.987H40.01V8.188z"
              fill="#FF5F00"
            ></path>
            <path
              d="M40.292 12.182c0-1.623.761-3.063 1.93-3.994a5.037 5.037 0 00-3.127-1.086 5.073 5.073 0 00-5.073 5.08 5.073 5.073 0 005.073 5.08c1.183 0 2.268-.41 3.128-1.087a5.075 5.075 0 01-1.93-3.993z"
              fill="#EB001B"
            ></path>
            <path
              d="M50.437 12.182a5.073 5.073 0 01-5.073 5.08 5.037 5.037 0 01-3.128-1.087 5.054 5.054 0 001.93-3.993c0-1.623-.76-3.063-1.93-3.994a5.037 5.037 0 013.128-1.086c2.804 0 5.073 2.286 5.073 5.08z"
              fill="#F79E1B"
            ></path>
            <path
              clip-rule="evenodd"
              d="M58.91 7.002c.336-.002 1.334-.092 1.756 1.336.285.962.738 2.537 1.36 4.727h.253a945.234 945.234 0 011.375-4.727c.427-1.443 1.494-1.336 1.92-1.336h3.294v10.26h-3.356v-6.046h-.225l-1.872 6.046H60.89l-1.871-6.051h-.225v6.051h-3.357V7.002h3.474zm14.778 0v6.05h.268l2.276-4.975c.442-.99 1.384-1.075 1.384-1.075h3.248v10.26h-3.427v-6.051h-.268l-2.231 4.976c-.442.985-1.428 1.075-1.428 1.075h-3.248V7.002h3.426zm19.02 4.875c-.478 1.357-1.979 2.329-3.64 2.329h-3.594v3.056h-3.259v-5.385h10.493z"
              fill="#0F754E"
            ></path>
            <path
              clip-rule="evenodd"
              d="M89.225 7.002h-7.18c.17 2.284 2.134 4.24 4.168 4.24h6.723c.387-1.899-.948-4.24-3.711-4.24z"
              fill="url(#p2p_svg__paint1_linear_2456_196)"
            ></path>
          </g>
          <defs>
            <linearGradient
              id="p2p_svg__paint0_linear_2456_196"
              x1=".95"
              y1="42.4"
              x2="28.887"
              y2="42.4"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#222459"></stop>
              <stop offset="1" stop-color="#2548A1"></stop>
            </linearGradient>
            <linearGradient
              id="p2p_svg__paint1_linear_2456_196"
              x1="93.001"
              y1="9.669"
              x2="82.044"
              y2="9.669"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#1F5CD7"></stop>
              <stop offset="1" stop-color="#02AEFF"></stop>
            </linearGradient>
          </defs>
        </svg>
      </template>
      <template #body></template>
    </Modal>
    <img id="header-logo" src="@/assets/images/logo.svg" />
    <div
      class="v-dropdown"
      v-if="$store.getters.isAuth"
      id="header-dropdown-menu"
    >
      <div class="v-dropdown-item" @click="showModal($refs.deposite_modal)">
        Пополнить
      </div>
      <div class="v-dropdown-item">Вывести</div>
      <div class="v-dropdown-item">История счета</div>
      <div
        class="v-dropdown-item"
        @click="
          this.innerText = 'Сохранить';
          updateSettingsData();
          showModal($refs.settings_modal);
        "
      >
        Настройки
      </div>
      <div class="v-dropdown-item" @click="$store.dispatch('logout')">
        Выйти
      </div>
    </div>
    <div id="header-right">
      <div id="header-right-wrap">
        <div
          id="header-feedback"
          @click="showModal($refs.feedback_modal)"
          role="button"
          class="button"
        >
          <div class="me-2">Обратная связь</div>
          <img src="@/assets/images/feedback.svg" />
        </div>
        <div id="header-controls" class="button">
          <div id="sound-btn" role="button" class="header-circle">
            <img src="@/assets/images/sound.svg" />
          </div>
          <img
            src="@/assets/images/divider.svg"
            style="height: 21px; margin: 0 10px"
          />
          <div
            id="about-btn"
            role="button"
            @click="showModal($refs.howtoplay_modal)"
            class="header-circle"
          >
            <img src="@/assets/images/howtoplay.svg" />
          </div>
        </div>
        <div
          v-if="!$store.getters.isAuth"
          id="header-login"
          @click="showModal($refs.login_modal)"
          role="button"
          class="button pink-shadow"
        >
          Войти
        </div>
        <div v-else id="header-profile-wrap" class="button">
          <div id="header-current-money">
            {{ $store.state.user.money.toFixed(2) }} ₽
          </div>
          <img
            src="@/assets/images/divider.svg"
            style="height: 21px; margin: 0 10px"
          />
          <div
            id="header-profile-btn"
            onclick="document.getElementById('header-dropdown-menu').classList.toggle('active')"
            role="button"
            style="width: 29.6px"
            class="header-circle"
          >
            <img style="width: 13px" src="@/assets/images/person.svg" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import ShowPassword from "./icons/ShowPassword.vue";
import DefaultModal from "./UI/DefaultModal.vue";
import Modal from "./UI/Modal.vue";

export default {
  components: { DefaultModal, ShowPassword, Modal },
  inject: [
    "showModal",
    "login_modal",
    "showPassword",
    "hideModal",
    "toggleModal",
  ],
  data() {
    return {
      settingsData: {
        name: "",
        email: "",
        current_password: "00000000",
        new_password: "",
        new_password_confirm: "",
      },
      settingsState: {
        emailChange: false,
        passwordChange: false,
      },
      settingsErrors: {
        name: "",
        email: "",
        current_password: "",
        new_password: "",
        new_password_confirm: "",
      },
      loginData: {
        email: "",
        password: "",
      },
      loginErrors: {
        error: false,
        email: "",
        password: "",
      },
      regErrors: {
        error: false,
        email: "",
        password: "",
        password_repeat: "",
      },
      regData: {
        email: "",
        password: "",
        password_repeat: "",
      },
      howtoplay_scroll: 50,
    };
  },
  mounted() {
    this.login_modal.value = this.$refs.login_modal;
  },
  methods: {
    editSettings(e) {
      if (
        this.settingsData.new_password != "" &&
        this.settingsData.new_password != this.settingsData.current_password
      ) {
        this.settingsErrors.new_password = "Пароли не совпадают!";
        this.settingsErrors.new_password_confirm = "Пароли не совпадают!";
        this.settingsData.new_password = "";
        this.settingsData.new_password_confirm = "";
        return;
      }
      e.target.setAttribute("disabled", "");
      e.target.innerText = "Сохранение...";
      this.$store
        .dispatch("editSettings", JSON.parse(JSON.stringify(this.settingsData)))
        .then((resp) => {
          if (resp === true) {
            this.settingsData.current_password = "00000000";
            e.target.innerText = "Данные изменены!";
          } else {
            for (let key in resp) {
              this.settingsData[key] = "";
              this.settingsErrors[key] = resp[key];
            }
            if (this.settingsErrors.new_password != "") {
              this.settingsErrors.new_password_confirm =
                this.settingsErrors.new_password;
              this.settingsData.new_password_confirm = "";
            }
            e.target.innerText = "Cохранить";
          }
          e.target.removeAttribute("disabled");
        });
    },
    updateSettingsData() {
      this.$store.dispatch("updateUserInfo").then(() => {
        this.settingsData.email = this.$store.state.user.email;
        this.settingsData.name = this.$store.state.user.name;
        this.settingsData.current_password = "00000000";
      });
    },
    validateReg() {
      this.regErrors.error = false;
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          this.regData.email
        )
      ) {
        this.regData.email = "";
        this.regErrors.email = "Электронная почта не валидна!";
        this.regErrors.error = true;
      }
      if (
        this.regData.password.length < 8 ||
        this.regData.password.length > 32
      ) {
        this.regErrors.password =
          "Пароль должен быть длинной от 8 до 32 символов!";
        this.regErrors.error = true;
      }
      if (this.regData.password != this.regData.password_repeat) {
        this.regErrors.password_repeat = "Пароли не совпадают";
        this.regErrors.error = true;
      }
      if (this.regErrors.password != "") {
        this.regData.password = "";
        this.regData.password_repeat = "";
      }
      if (this.regErrors.password_repeat != "") {
        this.regData.password_repeat = "";
      }
    },
    validateLogin() {
      this.loginErrors.error = false;
      if (this.loginData.email == "") {
        this.loginErrors.email = "Введите электронную почту!";
        this.loginErrors.error = true;
      }
      if (this.loginData.password == "") {
        this.loginErrors.password = "Введите пароль!";
        this.loginErrors.error = true;
      }
    },
    register(e) {
      e.target.setAttribute("disabled", "");
      e.target.innerText = "Регистрация...";
      this.validateReg();
      if (!this.regErrors.error) {
        this.$store.dispatch("register", this.regData).then((resp) => {
          if (resp === true) {
            this.$store
              .dispatch("login", {
                email: this.regData.email,
                password: this.regData.password,
              })
              .then(() => {
                this.$store.dispatch("updateUserBets");
                e.target.removeAttribute("disabled");
                e.target.innerText = "Зарегистрироваться";
                this.hideModal(this.$refs.reg_modal);
                this.regErrors = {
                  error: false,
                  email: "",
                  password: "",
                  password_repeat: "",
                };
              });
          }
        });
      }
    },
    login(e) {
      e.target.setAttribute("disabled", "");
      e.target.innerText = "Вход...";
      this.validateLogin();
      if (!this.loginErrors.error) {
        this.$store
          .dispatch("login", this.loginData)
          .then((resp) => {
            if (resp === true) {
              this.$store.dispatch("updateUserBets");
              this.hideModal(this.$refs.login_modal);
            } else {
              if ("email" in resp) {
                this.loginErrors.email = resp.email;
                this.loginData.email = "";
                this.loginData.password = "";
                this.loginErrors.error = true;
              }
              if ("password" in resp) {
                this.loginErrors.password = resp.password;
                this.loginData.password = "";
                this.loginErrors.error = true;
              }
            }
          })
          .then(() => {
            e.target.removeAttribute("disabled");
            e.target.innerText = "Войти";
          });
      }
    },
    howtoplayScroll(e) {
      e.target.onscroll = (e) => {
        this.howtoplay_scroll =
          50 -
          e.target.scrollTop /
            ((e.target.scrollHeight - e.target.clientHeight) / 100) /
            2;
      };
    },
  },
};
</script>

<style lang="scss">
@import url("/src/assets/css/base.css");

#settings_modal {
  width: 400px;
  .modal-dialog {
    width: 100%;
  }
  input {
    width: 100%;
  }
  .modal-body {
    flex-direction: column;
  }
  .modal-button {
    height: 35px;
    cursor: pointer;
    padding: 0 10px;
  }
}
#header-current-money {
  font-weight: 600;
  font-size: 12px;
}
#howtoplay_modal {
  width: 800px;
  .modal-body {
    overflow: hidden;
    height: 320px;
    & > div {
      overflow: scroll;
      flex-direction: column;
      font-weight: 300;
      p {
        font-size: 14px;
        font-weight: 700;
        line-height: 1;
        margin: 30px 0 10px;
      }
      p:first-child {
        margin: 0 0 10px;
      }
    }
  }
}
.modal-button {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  border-radius: 8px;
  height: 45px;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
}
#feedback-modal {
  .modal-dialog {
    width: 400px;
  }
  .modal-body {
    flex-direction: column;
    gap: 10px 0;
    font-size: 13px;
    padding: 15px 20px 20px !important;
  }
  .modal-contact-item {
    display: flex;
    align-items: center;
    &:first-child {
      margin-right: 11px;
    }
    div:first-child {
      font-weight: 400;
      margin-right: 5px;
    }
    div:last-child {
      font-weight: 700;
    }
  }
}
#login_modal,
#reg_modal {
  .modal-dialog {
    width: 400px;
  }
  .modal-body {
    flex-direction: column;
  }
}
header {
  width: 100%;
  position: relative;
  height: 70px;
  border-bottom: 1px solid var(--border-color);
  background: var(--app-bg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 15px;
}
#header-login {
  background: var(--pink-color);
  width: 90px;
  &:hover {
    background: #d1008c;
  }
}
#header-logo {
  height: 28px;
}
#header-right {
  background: var(--app-bg);
  z-index: 5;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
}
#header-dropdown-menu {
  right: 20px;
  top: -300%;
  &.active {
    top: 100%;
  }
}
#header-right-wrap {
  height: 42px;
  display: flex;
  gap: 10px;
  z-index: 5;
  & > div {
    height: 100%;
  }
}
#header-controls {
  cursor: default;
  padding: 10px;
}
.header-circle {
  display: flex;
  padding: 3px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--pink-color);
  img {
    width: 22px;
    height: 22px;
  }
}
</style>
