<template>
  <div>
    <section class="bread">
        <div class="bread-wrap">
            <nav class="">
                <a href="/">
                    Home
                </a>
                <slot></slot>
            </nav>
        </div>
    </section>
  </div>
</template>
<style>
  .bread{
      height: 1rem;
      line-height: 1rem;
      background-color: #f0f0f0;
  }
  .bread-wrap{
      padding: 0 0.1rem;
      font-size: 0.3rem;
      color: #a1a1a1;
  }
  .bread-wrap nav{
    width:3rem;
    position: relative;
    left:0.5rem;
  }
  .bread-wrap a{
      margin-right: 0.5rem;
  }
  .bread-wrap a:after{
      position: absolute;
      top: 0.25rem;
      content:'/';
      height: 0.5rem;
      line-height: 0.5rem;
  }
  .bread-wrap span{
      color: #d1434a;
  }
</style>

   