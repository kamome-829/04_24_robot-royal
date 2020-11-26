//隠しステータス関係の変数
let konjyou = 0;
let muteki = 0;
let tuigeki = 0;
let tuigeki_text = 0;
let inhp = 0;
let kyusyu = 0;
let crl_puras = 0;
// *** ライフ変更処理 ***
function my_alterLife(value) {
    // lifeの値を算出する
    my_life += value;
    if (my_life <= 0 && konjyou == 1) {
        konjyou = 0;
        my_life = 1;
        $(".text_explanation").text("根性で耐えた！！");
    }
    if (my_life <= 0) {
        // 算出の結果 0 以下になった場合
        my_life = 0
        // 0.3秒後に光部分を非表示にする
        setTimeout(function () {
            my_lifeMark.style.visibility = 'hidden'
            document.getElementById("down").style.display = "none";
            document.getElementById("button").style.display = "block";
            document.getElementById("winorlose_text").style.display = "block";
            $(".winorlose").text("you  Lose");
            enemy_life = 200;
        }, 300)
        //ExtensionScriptApis;
    } else {
        // 算出の結果 100 を超過した場合
        if (my_life > 100) {
            my_life = 100
        }
        // 光部分を表示する
        my_lifeMark.style.visibility = 'visible'
    }
    //火事場の馬鹿力処理
    if (go_hid == 16 && my_life <= 20) {
        my_str = 120;
        my_def += 0.7;
        my_spd += 0.7;
        my_crl += 0.7;
        console.log("aaa");
    }
    // スタイル(幅)を更新する
    my_lifeBar.style.width = my_life + "%"
}


function enemy_alterLife(value) {
    // lifeの値を算出する
    enemy_life += value
    if (enemy_life <= 0) {
        // 算出の結果 0 以下になった場合
        enemy_life = 0
        // 0.3秒後に光部分を非表示にする
        setTimeout(function () {
            enemy_lifeMark.style.visibility = 'hidden'
            document.getElementById("down").style.display = "none";
            document.getElementById("button").style.display = "block";
            document.getElementById("winorlose_text").style.display = "block";
            $(".winorlose").text("you  Win");
            my_life = 200;
        }, 300)
        //ExtensionScriptApis;
    } else {
        // 算出の結果 100 を超過した場合
        if (enemy_life > 100) {
            enemy_life = 100
        }
        // 光部分を表示する
        enemy_lifeMark.style.visibility = 'visible'
    }
    // スタイル(幅)を更新する
    enemy_lifeBar.style.width = enemy_life + "%"
}


function enemy_attack(ema, emc, myd, mys, myh) {
    let ma = Math.random() * 2;
    let ma2 = Math.random();
    let total = 0;
    let cr = 0
    if (mys < ma) {
        if (emc > ma2) {
            ema *= 1.5;
            cr = 1;
        }
        myd = 0.9 - myd;
        myh = 0.8 - myh;
        total = ema * myd * myh;
        if (go_hid == 19) {
            total *= 1.3;
        }
    }
    if (total == 0) {
        $(".text_explanation").text("自分は敵の攻撃をよけた！！");
    } else if (cr == 1) {
        $(".text_explanation").text("会心の一撃！！　自分は" + total + "ダメージを受けた");
    } else {
        $(".text_explanation").text("自分は" + total + "ダメージを受けた");
    }
    cr = 0;
    if (total > 1 && muteki > 0) {
        muteki--;
        total = 0;
        $(".text_explanation").text("無敵発動！！敵の攻撃を無効化した。あと" + muteki + "回");
    }
    my_alterLife(-total);
}

function my_attack(mya, myc, emd, ems, emh) {
    let ma = Math.random() * 2;
    let ma2 = Math.random();
    let total = 0;
    let cr = 0;
    if (ems < ma) {
        if (myc > ma2) {
            mya *= 1.5;
            cr = 1;
        }
        emd = 0.9 - emd;
        emh = 0.8 - emh;
        total = mya * emd * emh;
        if (cr == 1) {
            total += crl_puras;
        }
        enemy_alterLife(-total);
    }
    console.log(total);
    if (total == 0) {
        $(".text_explanation").text("敵は自分の攻撃をよけた！！");
    } else if (cr == 1) {
        $(".text_explanation").text("会心の一撃！！　敵は" + total + "ダメージを受けた");
    } else {
        $(".text_explanation").text("敵は" + total + "ダメージを受けた");
    }
    if (total == 0 && tuigeki == 1 && tuigeki_text == 1) {
        $(".text_explanation").text("敵は自分の攻撃をよけた！！しかし追撃発動もう一回攻撃！");
        tuigeki_text = 0;
    } else if (cr == 1 && tuigeki == 1 && tuigeki_text == 1) {
        $(".text_explanation").text("会心の一撃！！　敵は" + total + "ダメージを受けた  さらに追撃発動もう一回攻撃！");
        tuigeki_text = 0;
    } else if (tuigeki == 1 && tuigeki_text == 1) {
        $(".text_explanation").text("敵は" + total + "ダメージを受けた  さらに追撃発動もう一回攻撃！");
        tuigeki_text = 0;
    }
    cr = 0;
    if (go_hid == 15) {
        inhp = total / 5;
    }
}



function my_counter() {
    my_str += 10;
    my_def += 1 / 20;
    my_spd += 1 / 20;
    my_crl += 1 / 20;
    if (my_str > 120) {
        my_str = 120;
    }
    if (my_def > 0.7) {
        my_def = 0.7;
    }
    if (my_spd > 0.7) {
        my_spd = 0.7;
    }
    if (my_crl > 0.7) {
        my_crl = 0.7;
    }
    console.log(my_str);
    $(".text_explanation").text("自分は全ステータスが上昇した！");
}


function enemy_counter() {
    enemy_str += 10;
    enemy_spd += 1 / 20;
    enemy_def += 1 / 20;
    enemy_crl += 1 / 20;
    if (enemy_str > 120) {
        enemy_str = 120;
    }
    if (enemy_def > 0.7) {
        enemy_def = 0.7;
    }
    if (enemy_spd > 0.7) {
        enemy_spd = 0.7;
    }
    if (enemy_crl > 0.7) {
        enemy_crl = 0.7;
    }
    $(".text_explanation").text("敵は全ステータスが上昇した！");
}


function my_item() {
    let total = 15;
    enemy_alterLife(-total);
    $(".text_explanation").text("敵は" + total + "ダメージを受けた");
}


function enemy_item() {
    let total = 15;
    if (go_teki == 1) {
        total = 20;
    }
    if (go_teki == 2) {
        total = 25;
    }
    $(".text_explanation").text("自分は" + total + "ダメージを受けた");
    if (total > 1 && muteki > 0) {
        muteki--;
        total = 0;
        $(".text_explanation").text("無敵発動！！敵のアイテム攻撃を無効化した。あと" + muteki + "回");
    }
    my_alterLife(-total);
}


function my_heal() {
    let total = 30;
    my_alterLife(total);
    $(".text_explanation").text("自分は体力を" + total + "回復した");
}


function enemy_heal() {
    let total = 30;

    if (go_teki == 1) {
        total = 50;
    }
    if (go_teki == 2) {
        total = 35;
    }
    enemy_alterLife(total);
    $(".text_explanation").text("敵は体力を" + total + "回復した");
}



function enemy_strong(ema, emc, myd, mys, myh) {
    let ma = Math.random() * 2.5;
    let ma2 = Math.random();
    let total = 0;
    let cr = 0
    if (mys < ma) {
        if (emc > ma2) {
            ema *= 1.5;
            cr = 1;
        }
        myd = 0.9 - myd;
        myh = 0.8 - myh;
        total = ema * myd * myh * 1.5;
        if (go_hid == 19) {
            total *= 1.3;
        }
    }
    console.log(myh);
    console.log(total);
    if (total == 0) {
        $(".text_explanation").text("自分は敵の必殺技をよけた！！");
    } else if (cr == 1) {
        $(".text_explanation").text("必殺技！さらに会心の一撃！！　自分は" + total + "ダメージを受けた  特大ダメージ！！");
    } else {
        $(".text_explanation").text("自分は" + total + "ダメージを受けた  大ダメージ！！");
    }
    cr = 0;
    if (total > 1 && muteki > 0) {
        muteki--;
        total = 0;
        $(".text_explanation").text("無敵発動！！敵の必殺技を無効化した。あと" + muteki + "回");
    }
    my_alterLife(-total);
}

function my_strong(mya, myc, emd, ems, emh) {
    let ma = Math.random() * 2.5;
    let ma2 = Math.random();
    let total = 0;
    let cr = 0;
    if (ems < ma) {
        if (myc > ma2) {
            mya *= 1.5;
            cr = 1;
        }
        emd = 0.9 - emd;
        emh = 0.8 - emh;
        total = mya * emd * emh * 1.5;
        if (cr == 1) {
            total += crl_puras;
        }
        enemy_alterLife(-total);
    }
    if (total == 0) {
        $(".text_explanation").text("敵は自分の必殺技をよけた！！");
    } else if (cr == 1) {
        $(".text_explanation").text("必殺技！会心の一撃！！　敵は" + total + "ダメージを受けた  特大ダメージ！！");
    } else {
        $(".text_explanation").text("敵は" + total + "ダメージを受けた  大ダメージ！！");
    }
    cr = 0;
    if (go_hid == 15) {
        inhp = total / 5;
    }
}


function enemy_text() {
    const rand = Math.floor(Math.random() * 5);
    $('.text_explanation').text(enemy_text_deta[rand]);
    return rand;
}

function enemy_turn(taku) {
    switch (taku) {
        case 0:
            enemy_attack(enemy_str, enemy_crl, my_def, my_spd, my_hp);
            break;
        case 1:
            enemy_counter();
            break;
        case 2:
            enemy_item();
            break;
        case 3:
            enemy_heal();
            break;
        case 4:
            enemy_strong(enemy_str, enemy_crl, my_def, my_spd, my_hp);
            break;
    }
}

function taku_none() {
    document.getElementById("attack").style.display = "none";
    document.getElementById("counter").style.display = "none";
    document.getElementById("item").style.display = "none";
    document.getElementById("heal").style.display = "none";
    document.getElementById("strong").style.display = "none";
}

function taku_block() {
    document.getElementById("attack").style.display = "block";
    document.getElementById("counter").style.display = "block";
    document.getElementById("item").style.display = "block";
    document.getElementById("heal").style.display = "block";
    document.getElementById("strong").style.display = "block";
}