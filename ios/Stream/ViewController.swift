//
//  ViewController.swift
//  Stream
//
//  Created by Toan Nguyen Dinh on 12/29/17.
//  Copyright © 2017 Toan Nguyen Dinh. All rights reserved.
//

import UIKit

class ViewController: UIViewController, VLCMediaPlayerDelegate {

    let player: VLCMediaPlayer = {
        
        let p = VLCMediaPlayer()
        
        return p
        
    }()
    
    let playerView: UIView = {
        
        let view = UIView()
        
        view.translatesAutoresizingMaskIntoConstraints = false
       
        return view
    }()
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        setupPlayer()
    }
    
    func setupPlayer(){
        
        self.view.addSubview(playerView)
        
        playerView.topAnchor.constraint(equalTo: self.view.topAnchor, constant: 0).isActive = true
        playerView.leftAnchor.constraint(equalTo: self.view.leftAnchor, constant: 0).isActive = true
        playerView.bottomAnchor.constraint(equalTo: self.view.bottomAnchor, constant: 0).isActive = true
        playerView.rightAnchor.constraint(equalTo: self.view.rightAnchor, constant: 0).isActive = true
        
        playerView.backgroundColor = UIColor.black
        
        
        let streamUrl = URL(string: "rtmp://192.168.1.10/play/tabvn")
        
        let media = VLCMedia(url: streamUrl)
        
        player.media = media
        player.delegate = self
        player.drawable = playerView
        
        // Play video
        
        player.play()
        
        
        
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

