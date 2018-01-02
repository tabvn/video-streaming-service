//
//  CameraCollectionViewCell.swift
//  Stream
//
//  Created by Toan Nguyen Dinh on 1/2/18.
//  Copyright © 2018 Toan Nguyen Dinh. All rights reserved.
//

import UIKit

class CameraCollectionViewCell: UICollectionViewCell, VLCMediaPlayerDelegate {
    
    
    var didSetup: Bool = false
    
    var camera: Camera!
    
    let cameraTitle: UILabel = {
        
        let label = UILabel()
        
        label.translatesAutoresizingMaskIntoConstraints = false
        label.font = UIFont.boldSystemFont(ofSize: 14)
        label.text = "Camera"
        
        label.textColor = .white
        
        return label
        
    }()
    lazy var playerView: UIView = {
        
        let v = UIView()
        
        v.translatesAutoresizingMaskIntoConstraints = false
        
        let tap = UITapGestureRecognizer(target: self, action: #selector(self.startPlay))
        v.addGestureRecognizer(tap)
        
        
        return v
        
    }()
    
    
    let player: VLCMediaPlayer = {
        
        let p = VLCMediaPlayer()
        
        
        return p
        
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    

    
    func setupPlayer() -> Void{
        
        if self.didSetup{
            
            return
        }
        
        self.addSubview(cameraTitle)
        self.addSubview(playerView)
        
        // add autolayout for player view
        let parentView = self
        playerView.topAnchor.constraint(equalTo: parentView.topAnchor, constant: 0).isActive = true
        playerView.leftAnchor.constraint(equalTo: parentView.leftAnchor, constant: 0).isActive = true
        playerView.rightAnchor.constraint(equalTo: parentView.rightAnchor, constant: 0).isActive = true
        playerView.bottomAnchor.constraint(equalTo: parentView.bottomAnchor, constant: -30).isActive = true
        
        
        // setup autolayout for camera title
        
        cameraTitle.bottomAnchor.constraint(equalTo: parentView.bottomAnchor, constant: 0).isActive = true
        cameraTitle.leftAnchor.constraint(equalTo: parentView.leftAnchor, constant: 8).isActive = true
        cameraTitle.rightAnchor.constraint(equalTo: parentView.rightAnchor, constant: -8).isActive = true
        

        
        self.didSetup = true
        
        let mediaUrl = URL(string: camera.url)
        let media = VLCMedia(url: mediaUrl)
        player.media = media
        player.currentAudioTrackIndex = -1
        
        player.delegate = self
        player.drawable = playerView
        
       
       
        
        
        
    }
    
    @objc func startPlay(){
        
        if self.player.isPlaying{
            
            // pause video
            
            self.player.pause()
        }else{
            
            
            self.player.play()
        }
        
    }
    
    
}
