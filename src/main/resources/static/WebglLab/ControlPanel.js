

var controlObject;
var init_pos_x;
var init_pos_y;
var init_pos_z;
var init_rot_x;
var init_rot_y;
var init_rot_z;

var pos_x;
var pos_y;
var pos_z;
var rot_x;
var rot_y;
var rot_z;
function init_control_object(cobj) {
    controlObject = cobj;
    init_pos_x = controlObject.position.x;
    init_pos_y = controlObject.position.y;
    init_pos_z = controlObject.position.z;
    init_rot_x = controlObject.rotation.x;
    init_rot_y = controlObject.rotation.y;
    init_rot_z = controlObject.rotation.z;

}

function init_slider(px,py,pz,rx,ry,rz) {

    pos_x = px;
    pos_y = py;
    pos_z = pz;
    rot_x = rx;
    rot_y = ry;
    rot_z = rz;

    //pos_x.onchange = pos_x_changeevent();

    pos_x.onmousemove =posxchange;
    pos_y.onmousemove =posychange;
    pos_z.onmousemove =poszchange;
    rot_x.onmousemove =rotxchange;
    rot_y.onmousemove =rotychange;
    rot_z.onmousemove =rotzchange;

}
function  posxchange(ev){
    console.info(pos_x.value-250);

    controlObject.position.x = (pos_x.value - 250)/100+init_pos_x;
}

function posychange(eve) {
    controlObject.position.y = (pos_y.value - 250)/100+init_pos_y;

}
function poszchange(eve) {
    controlObject.position.z = (pos_z.value - 250)/100+init_pos_z;
}

function rotxchange(eve) {
    controlObject.rotation.x = (rot_x.value - 250)/100+init_rot_x;
}

function rotychange(eve) {
    controlObject.rotation.y = (rot_y.value - 250)/100+init_rot_y;
}
function  rotzchange(eve) {
    controlObject.rotation.z = (rot_z.value - 250)/100+init_rot_z;
}