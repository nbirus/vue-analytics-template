<template>
  <div class="page">

    <div class="page-body">

      <div class="message-container">

        <div class="img">
          <img height="40" src="../../../assets/nci-logo-full-blue.png" alt="National Cancer Institute"/>
        </div>

        <div class="message">
          <p>
            You are accessing a U.S. Government information system, which
            includes (1) this computer, (2) this computer network, (3) all
            computers connected to this network, and (4) all devices and storage
            media attached to this network or to a computer on this network. This
            information system is provided for U.S. Government-authorized use
            only.
          </p>
          <p>
            Unauthorized or improper use of this system may result in
            disciplinary action, as well as civil and criminal penalties.
          </p>
          <p>
            By using this information system, you understand and consent to the
            following.
          </p>
          <p>
            - You have no reasonable expectation of privacy regarding any
            communications or data transiting or stored on this information
            system. At any time, and for any lawful Government purpose, the
            government may monitor, intercept, record, and search and seize any
            communication or data transiting or stored on this information
            system.
          </p>
          <p>
            - Any communication or data transiting or stored on this information
            system may be disclosed or used for any lawful Government purpose.
          </p>
        </div>

        <div class="actions">

          <btn block theme="cyan" @click="login">ACCESS ANALYTICS TEMPLATE</btn>

          <!-- <p class="about">
            <a
              href="http://www.cancer.gov/about-cancer/treatment/clinical-trials/nci-supported/nci-match"
              target="_blank"
            >
              About NCI-MATCH Trial
            </a>
          </p> -->

        </div>

      </div>


      <!-- <div class="panel login-panel">

        <div class="panel-header">
          <h2>Login</h2>
        </div>

        <div class="panel-body">
          <div class="panel-section">
            <text-input :required="true" style="margin-bottom: 15px" label="Username" placeholder="Enter username or email.."></text-input>
            <text-input :required="true" style="margin-bottom: 15px" label="Password" placeholder="Enter password.."></text-input>
            <btn @click="login" theme="lime" block>Login</btn>
          </div>
        </div>

      </div> -->

    </div>

  </div>
</template>

<script>
  export default {
    name: 'login',
    methods: {
      login () {
        this.$store.dispatch('auth/login')
      }
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../styles/app-helper.less';

  .page {

    .message-container {
      width: 600px;
      margin: 8rem auto 0;

      .img {
        width: 100%;
        text-align: center;
        margin-bottom: 2rem;

        img {
          width: 80%; height: auto;
        }
      }

      .message {
        margin-bottom: 2rem;

        p {
          margin-bottom: 1rem;
        }
      }

      .actions {

        .about {
          width: 100%;
          margin-top: 1rem; padding-top: 1rem;
          text-align: center;
          border-top: solid thin @grey4;
        }
      }

    }
  }


</style>
