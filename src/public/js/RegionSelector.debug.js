
function validateRegion(){$.ajax({type:'GET',url:'/fale-conosco/choose-state1',contentType:"application/json; charset=utf-8",success:function(data){let dropUf=$('select.drop-uf');console.log(data);$.each(data.regions,function(key,value){dropUf.append('<option value='+value.Id+'>'+value.Region+'</option>');$('.box-uf .dropdown-menu ul').append('<li data-original-index="'+key+'"><a tabindex="0" class="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span class="text">'+value.Region+'</span><span class="material-icons  check-mark"> done </span></a></li>');if(value.Id==data.region_id){$('.filter-option').text(value.Region);}});if(data.redirect){window.location.href=url;}},error:function(jqXHR,textStatus,errorThrown){console.log(jqXHR);console.log(textStatus);console.log(errorThrown);}});}
function registerEventHandler(){$('select.drop-uf').change(function(){var obj={regionId:$(this).val()};console.log(obj);$.ajax({type:'POST',url:'/fale-conosco/choose-state2',data:JSON.stringify(obj),contentType:"application/json; charset=utf-8",success:function(data){if(data.redirect){window.location.href=data.url;}},error:function(jqXHR,textStatus,errorThrown){console.log(jqXHR);console.log(textStatus);console.log(errorThrown);}});});}
$(document).ready(function(){validateRegion();registerEventHandler();});