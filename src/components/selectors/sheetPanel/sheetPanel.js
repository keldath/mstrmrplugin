

<!-- this acts as a panel selector-->
<div class='SelectorsContainer' id='default' type='sheetpanel' linker='1'>By  
    <div class='Container_drop_down' >
      <button class='Container_btn' name='default' linker='1' onmouseenter="window.scPSSelectorsEffect('default',event)">Service Gateways</button>
        <div class='Container_drop_list' style='display:none;'>
                  <a href='#' class='Container_drop_item' type='pn' sindex='0' pindex='0'>Service Gateways</a>
                  <a href='#' class='Container_drop_item' type='pn' sindex='0' pindex='1'>Line</a>
                  <a href='#' class='Container_drop_item' type='pn' sindex='0' pindex='2'>Pipe</a>
                  <a href='#' class='Container_drop_item' type='pn' sindex='0' pindex='3'>VC</a>
        </div>
  </div>      
</div>
<!-- this acts as a sheet and panel selector-->
<div class='SelectorsContainer' id='default' type='sheetpanel' linker='2'>Resolution  
    <div class='Container_drop_down' >
      <button class='Container_btn' name='default' linker='2' onmouseenter="window.scPSSelectorsEffect('default',event)">Raw</button>
        <div class='Container_drop_list' style='display:none;'>
                  <a href='#' class='Container_drop_item' type='sh' sindex='0' pindex='0'>Raw</a>
                  <a href='#' class='Container_drop_item' type='sh' sindex='1' pindex='0'>Hourly</a>
                  <a href='#' class='Container_drop_item' type='sh' sindex='2' pindex='0'>Daily</a>
        </div>
</div>
</div>
<script>
if (window.SPSrunMewhenReady != undefined) {
    window.SPSrunMewhenReady()
}
</script>