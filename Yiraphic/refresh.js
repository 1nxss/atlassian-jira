<script>
/* Hide panels from users that are not logged in */
/* Add logged-in class to body if user is not logged in */
if (document.getElementsByClassName('login-link').length < 1) {
   document.body.className += ' logged-in';
}
function refresh ()
{

$( ".qrf-refresh-filters" ).trigger( "click" );

}
setInterval(refresh,60000);
</script>
