#!groovy

@Library('Jenkins-Audibene-MPL') _

def pipelineConfig = [
    ecrRepoName: 'ta-auth-middleware',
    kubernetesDeploymentName: 'ta-auth-middleware',
    appNamespace: 'teleaudiology',
    appRegion: 'eu-central-1',
    ecrRegion: 'eu-central-1',
    newPodLogTailTimeout: '30',
    podRole: 'JenkinsAgentTeleaudiology',
    slackChannel: '#ta-ci-notifications',
    podContainers: [
        containerTemplate(
            name: 'node',
            image: 'node:14',
            ttyEnabled: true,
            privileged: true,
            alwaysPullImage: true,
            command: 'cat'
        ),
        containerTemplate(
            name: 'aws-cli-v2',
            image: 'amazon/aws-cli:latest',
            ttyEnabled: true,
            privileged: true,
            alwaysPullImage: true,
            command: 'cat'
        ),
        containerTemplate(
            name: 'docker-dind',
            image: '199636132489.dkr.ecr.eu-central-1.amazonaws.com/aud-docker-dind:19.03.11-dind',
            ttyEnabled: true,
            privileged: true,
            alwaysPullImage: true,
            command: 'dockerd --host=unix:///var/run/docker.sock --host=tcp://0.0.0.0:2375 --storage-driver=overlay'
        )
    ],
    branchToEnvironmentMapping: [
        'develop'  : 'testing',
        'candidate': 'staging',
        'master'   : 'production'
    ]
]

audPipelineBootstrap(pipelineConfig) {
    stage('fetch aws codeartifact token') {
        container('aws-cli-v2') {
            token = sh(returnStdout: true, script: "aws codeartifact get-authorization-token --domain audibene --domain-owner 199636132489 --query authorizationToken --output text").trim()
        }
    }

    withEnv(["CODEARTIFACT_AUTH_TOKEN=$token"]) {
        stage('install') {
            container('node') {
                sh "npm install --unsafe-perm"
            }
        }
        stage('Test'){
            container('docker-dind'){
            sh "npm test"
            }
        }
        stage('audit') {
            container('node') {
                sh "npm audit --audit-level=critical"
            }
        }

        if (BRANCH_NAME == "master") {
            stage('npm publish') {
                container('node') {
                    sh "npx standard-version --releaseCommitMessageFormat 'chore(release): [ci skip] {{currentTag}}'"
                }

                sshagent (credentials: ['jenkins-audibene-ssh']) {
                    sh "git push --follow-tags origin HEAD:refs/heads/master"
                }

                container('node'){
                    sh "npm publish --unsafe-perm"
                }
            }
        }
    }
}
